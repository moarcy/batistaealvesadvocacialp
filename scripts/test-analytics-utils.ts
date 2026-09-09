/**
 * Unit tests for dashboard date parsing / filtering (no server required).
 * Run: npx tsx scripts/test-analytics-utils.ts
 */
import {
  parseEventDate,
  filterEventsByDateRange,
  aggregateMetrics,
} from "../server/analytics-utils";

function assert(cond: unknown, msg: string) {
  if (!cond) throw new Error("FAIL: " + msg);
  console.log("  PASS:", msg);
}

console.log("\n===== TESTE parseEventDate / filterEventsByDateRange =====\n");

console.log("1) Parsing de formatos Postgres / ISO");
const samples = [
  "2024-08-26 19:20:00.123456+00",
  "2024-08-26 19:20:00.123456-03",
  "2024-08-26 19:20:00",
  "2024-08-26T19:20:00.123Z",
  "2024-08-26T19:20:00.123456",
];
for (const s of samples) {
  const d = parseEventDate(s);
  assert(d !== null && !isNaN(d!.getTime()), `parseia "${s}"`);
}

const broken = new Date("2024-08-26 19:20:00.123456+00".replace(" ", "T"));
assert(isNaN(broken.getTime()), "reproduz bug antigo replace+offset");
assert(
  parseEventDate("2024-08-26 19:20:00.123456+00") !== null,
  "fix evita Invalid Date no offset +00",
);

console.log("\n2) Filtro por intervalo");
const events = [
  {
    createdAt: "2024-08-26 12:00:00.000000+00",
    eventType: "pageview",
    path: "/",
    sessionId: "a",
    metadata: null,
  },
  {
    createdAt: "2024-08-27 12:00:00.000000+00",
    eventType: "pageview",
    path: "/guia",
    sessionId: "b",
    metadata: null,
  },
  {
    createdAt: "2024-08-28 12:00:00.000000+00",
    eventType: "click",
    path: "whatsapp_hero",
    sessionId: "c",
    metadata: null,
  },
];

const start = new Date("2024-08-26T00:00:00.000Z");
const end = new Date("2024-08-26T23:59:59.999Z");
const filtered = filterEventsByDateRange(events, start, end);
assert(filtered.length === 1, "filtro de um dia retorna 1 evento");
assert(filtered[0].path === "/", "evento filtrado é o do dia 26");

const empty = filterEventsByDateRange(
  events,
  new Date("2020-01-01T00:00:00.000Z"),
  new Date("2020-01-01T23:59:59.999Z"),
);
assert(empty.length === 0, "filtro no passado retorna 0");

const allWithBugStyle = events.filter((e) => {
  const date = new Date(e.createdAt.replace(" ", "T"));
  if (isNaN(date.getTime())) return true;
  return date >= start && date <= end;
});
assert(allWithBugStyle.length === 3, "reproduz bug: Invalid Date passa no filtro");

console.log("\n3) Agregação");
const metrics = aggregateMetrics(events);
assert(metrics.totalVisits === 2, "totalVisits = 2");
assert(metrics.totalClicks === 1, "totalClicks = 1");
assert(metrics.eventsByDate.length === 3, "eventsByDate tem 3 dias");

console.log("\n===== TODOS OS TESTES PASSARAM =====\n");
