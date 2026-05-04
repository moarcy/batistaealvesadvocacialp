const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem("analytics_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
    localStorage.setItem("analytics_session_id", sessionId);
  }
  return sessionId;
};

export const trackEvent = async (
  eventType: 'pageview' | 'click' | 'time_on_page' | 'scroll_depth',
  path: string,
  metadata?: Record<string, any>
) => {
  try {
    const sessionId = getOrCreateSessionId();
    await fetch("/api/app-events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventType,
        path,
        sessionId,
        metadata,
      }),
    });
  } catch (err) {
    console.error("Failed to track event", err);
  }
};

/** Rastreia a origem do visitante (de onde ele veio) */
export const getReferrer = (): string => {
  const ref = document.referrer;
  if (!ref) return 'direto';
  try {
    const url = new URL(ref);
    const hostname = url.hostname.replace('www.', '');
    if (hostname.includes('google')) return 'google';
    if (hostname.includes('bing')) return 'bing';
    if (hostname.includes('facebook') || hostname.includes('fb.com')) return 'facebook';
    if (hostname.includes('instagram')) return 'instagram';
    if (hostname.includes('whatsapp')) return 'whatsapp';
    if (hostname.includes('linkedin')) return 'linkedin';
    return hostname;
  } catch {
    return 'outros';
  }
};

/** Hook de rastreamento de tempo de permanência.
 *  Chame na montagem do componente de página e retorna uma função de cleanup.
 */
export const startTimeTracking = (path: string): (() => void) => {
  const startTime = Date.now();
  
  const sendTime = () => {
    const seconds = Math.round((Date.now() - startTime) / 1000);
    // Só envia se ficou pelo menos 3 segundos na página
    if (seconds >= 3) {
      trackEvent('time_on_page', path, { seconds });
    }
  };

  // Envia quando o usuário fecha a aba ou navega para outra página
  window.addEventListener('beforeunload', sendTime);
  return () => {
    sendTime();
    window.removeEventListener('beforeunload', sendTime);
  };
};

/** Hook de rastreamento de profundidade de rolagem.
 *  Chame na montagem do componente de página e retorna uma função de cleanup.
 */
export const startScrollTracking = (path: string): (() => void) => {
  let reached50 = false;
  let reached100 = false;

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = (scrollTop / docHeight) * 100;

    if (!reached50 && pct >= 50) {
      reached50 = true;
      trackEvent('scroll_depth', path, { depth: 50 });
    }
    if (!reached100 && pct >= 90) {
      reached100 = true;
      trackEvent('scroll_depth', path, { depth: 100 });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
};
