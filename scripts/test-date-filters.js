/**
 * Script de Teste dos Filtros de Data do Dashboard
 *
 * Como usar:
 * 1. Com o servidor rodando (npm run dev na RAIZ do projeto), abra outro terminal
 * 2. Execute: node scripts/test-date-filters.js
 */

const BASE_URL = "http://localhost:5000";
let sessionCookie = "";

async function trackEvent(eventType, path, metadata) {
  const sessionId = "test-session-" + Math.random().toString(36).slice(2);
  const res = await fetch(`${BASE_URL}/api/app-events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventType, path, sessionId, metadata }),
  });
  return res.ok;
}

async function getMetrics(startDate, endDate) {
  let url = `${BASE_URL}/api/app-metrics`;
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  if (params.toString()) url += `?${params}`;

  const res = await fetch(url, {
    headers: { "Cookie": sessionCookie },
  });
  if (!res.ok) return null;
  return res.json();
}

async function loginFirst() {
  const res = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "batistaealvesadvocacia", password: "Admin123!" }),
  });
  const data = await res.json();
  // Extrai o cookie da resposta para reused nas próximas requisições
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    sessionCookie = setCookie.split(";")[0];
  }
  return data.success;
}

async function runTests() {
  console.log("\n===== TESTE DOS FILTROS DE DATA DO DASHBOARD =====\n");

  // 0) Login
  console.log("🔐 Fazendo login...");
  const loggedIn = await loginFirst();
  console.log(loggedIn ? "✅ Login OK\n" : "❌ Login falhou — verifique o servidor\n");
  if (!loggedIn) return;

  // 1) Inserir eventos de teste
  console.log("📤 Inserindo eventos de teste...");
  await trackEvent("pageview", "/", { referrer: "google" });
  await trackEvent("pageview", "/guia", { referrer: "direto" });
  await trackEvent("click", "whatsapp_hero", {});
  await trackEvent("time_on_page", "/", { seconds: 45 });
  await trackEvent("scroll_depth", "/guia", { depth: 50 });
  await trackEvent("scroll_depth", "/guia", { depth: 100 });
  console.log("✅ 6 eventos inseridos\n");

  // 2) SEM filtro — deve conter tudo
  console.log("📊 Métricas SEM filtro (deve conter todos os eventos):");
  const all = await getMetrics();
  if (all) {
    console.log(`  - Total de visitas: ${all.totalVisits} (esperado: >= 2)`);
    console.log(`  - Total de cliques: ${all.totalClicks} (esperado: >= 1)`);
    console.log(`  - Tempo médio: ${all.avgTimeOnPage}s (esperado: > 0)`);
    console.log(`  - Origens de tráfego:`, all.referrers);
    console.log(`  - Scroll por página:`, all.scrollDepthByPath);
    const ok = all.totalVisits >= 2 && all.totalClicks >= 1;
    console.log(`  - Resultado: ${ok ? "PASS" : "FAIL"}\n`);
  }

  const now = new Date();

  // 3) Filtro: hoje — deve conter os eventos
  const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);
  const todayEnd   = new Date(now); todayEnd.setHours(23, 59, 59, 999);
  console.log("📊 Filtro: hoje (deve mostrar eventos):");
  const today = await getMetrics(todayStart.toISOString(), todayEnd.toISOString());
  if (today) {
    const ok = today.totalVisits >= 2;
    console.log(`  - Total de visitas: ${today.totalVisits} (esperado: >= 2)`);
    console.log(`  - Resultado: ${ok ? "PASS" : "FAIL"}\n`);
  }

  // 4) Filtro: amanhã — deve retornar 0
  const tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate() + 1); tomorrow.setHours(0, 0, 0, 0);
  const tomorrowEnd = new Date(tomorrow); tomorrowEnd.setHours(23, 59, 59, 999);
  console.log("📊 Filtro: amanhã (deve retornar 0 visitas):");
  const tmrw = await getMetrics(tomorrow.toISOString(), tomorrowEnd.toISOString());
  if (tmrw) {
    const ok = tmrw.totalVisits === 0 && tmrw.totalClicks === 0;
    console.log(`  - Total de visitas: ${tmrw.totalVisits} (esperado: 0)`);
    console.log(`  - Total de cliques: ${tmrw.totalClicks} (esperado: 0)`);
    console.log(`  - Resultado: ${ok ? "PASS" : "FAIL - filtro nao esta funcionando!"}\n`);
  }

  // 5) Filtro: data no passado — deve retornar 0
  console.log("📊 Filtro: 01/01/2020 (deve retornar 0 visitas):");
  const past = await getMetrics("2020-01-01T00:00:00.000Z", "2020-01-01T23:59:59.000Z");
  if (past) {
    const ok = past.totalVisits === 0;
    console.log(`  - Total de visitas: ${past.totalVisits} (esperado: 0)`);
    console.log(`  - Resultado: ${ok ? "PASS" : "FAIL - filtro nao esta funcionando!"}\n`);
  }

  console.log("===== TESTES CONCLUÍDOS =====\n");
}

runTests().catch(console.error);
