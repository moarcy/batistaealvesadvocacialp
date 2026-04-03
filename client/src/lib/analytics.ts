const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem("analytics_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
    localStorage.setItem("analytics_session_id", sessionId);
  }
  return sessionId;
};

export const trackEvent = async (eventType: 'pageview' | 'click', path: string) => {
  try {
    const sessionId = getOrCreateSessionId();
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventType,
        path,
        sessionId,
      }),
    });
  } catch (err) {
    console.error("Failed to track event", err);
  }
};
