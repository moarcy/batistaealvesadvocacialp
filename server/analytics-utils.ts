/**
 * Helpers for analytics metrics: robust date parsing and aggregation.
 * PostgreSQL text timestamps often look like "2024-08-26 19:20:00.123456+00",
 * which breaks naive `.replace(' ', 'T')` → Invalid Date.
 */

export function parseEventDate(raw: unknown): Date | null {
  if (raw == null) return null;
  if (raw instanceof Date) {
    return isNaN(raw.getTime()) ? null : raw;
  }

  const s = String(raw).trim();
  if (!s) return null;

  // V8 accepts Postgres-style "YYYY-MM-DD HH:MM:SS.sss±HH" without replacing the space.
  let date = new Date(s);
  if (!isNaN(date.getTime())) return date;

  // Normalize common variants that native parsing may reject.
  const match = s.match(
    /^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2}(?:\.\d+)?)(.*?)$/,
  );
  if (match) {
    const [, day, time, tzRaw] = match;
    let tz = (tzRaw || "").trim();
    if (!tz) {
      tz = "Z";
    } else if (tz === "UTC" || tz === "GMT") {
      tz = "Z";
    } else if (/^[+-]\d{2}$/.test(tz)) {
      tz = `${tz}:00`;
    } else if (/^[+-]\d{4}$/.test(tz)) {
      tz = `${tz.slice(0, 3)}:${tz.slice(3)}`;
    }
    date = new Date(`${day}T${time}${tz}`);
    if (!isNaN(date.getTime())) return date;
  }

  return null;
}

export function isValidDate(d: Date | undefined | null): d is Date {
  return !!d && !isNaN(d.getTime());
}

type AnalyticsLike = {
  eventType: string;
  path: string;
  sessionId: string;
  createdAt: string;
  metadata?: Record<string, any> | null;
};

export function aggregateMetrics(filteredEvents: AnalyticsLike[]) {
  const totalVisits = filteredEvents.filter((e) => e.eventType === "pageview").length;
  const totalClicks = filteredEvents.filter((e) => e.eventType === "click").length;

  const uniqueSessions = new Set(
    filteredEvents.filter((e) => e.eventType === "pageview").map((e) => e.sessionId),
  );
  const uniqueVisits = uniqueSessions.size;

  const ctr =
    totalVisits > 0 ? ((totalClicks / totalVisits) * 100).toFixed(2) : "0.00";

  const byDate = new Map<string, { visits: number; clicks: number }>();
  for (const e of filteredEvents) {
    const parsed = parseEventDate(e.createdAt);
    const dateKey = parsed ? parsed.toISOString().split("T")[0] : "unknown";
    if (!byDate.has(dateKey)) {
      byDate.set(dateKey, { visits: 0, clicks: 0 });
    }
    const dayData = byDate.get(dateKey)!;
    if (e.eventType === "pageview") dayData.visits++;
    if (e.eventType === "click") dayData.clicks++;
  }

  const eventsByDate = Array.from(byDate.entries())
    .map(([date, data]) => ({
      date,
      visits: data.visits,
      clicks: data.clicks,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const pageViewsByPath: Record<string, number> = {};
  const clicksByPath: Record<string, number> = {};
  const referrers: Record<string, number> = {};
  const scrollDepthByPath: Record<string, { d50: number; d100: number }> = {};
  let totalTimeSeconds = 0;
  let timeOnPageCount = 0;

  for (const e of filteredEvents) {
    const meta = (e.metadata as Record<string, any> | null) ?? {};
    if (e.eventType === "pageview") {
      pageViewsByPath[e.path] = (pageViewsByPath[e.path] || 0) + 1;
      if (meta.referrer) {
        referrers[meta.referrer] = (referrers[meta.referrer] || 0) + 1;
      }
    }
    if (e.eventType === "click") {
      clicksByPath[e.path] = (clicksByPath[e.path] || 0) + 1;
    }
    if (e.eventType === "time_on_page" && typeof meta.seconds === "number") {
      totalTimeSeconds += meta.seconds;
      timeOnPageCount++;
    }
    if (e.eventType === "scroll_depth") {
      if (!scrollDepthByPath[e.path]) scrollDepthByPath[e.path] = { d50: 0, d100: 0 };
      if (meta.depth === 50) scrollDepthByPath[e.path].d50++;
      if (meta.depth === 100) scrollDepthByPath[e.path].d100++;
    }
  }

  const avgTimeOnPage =
    timeOnPageCount > 0 ? Math.round(totalTimeSeconds / timeOnPageCount) : 0;

  return {
    uniqueVisits,
    totalVisits,
    totalClicks,
    ctr,
    eventsByDate,
    pageViewsByPath,
    clicksByPath,
    avgTimeOnPage,
    referrers,
    scrollDepthByPath,
  };
}

export function filterEventsByDateRange<T extends { createdAt: string }>(
  events: T[],
  startDate?: Date,
  endDate?: Date,
): T[] {
  if (!isValidDate(startDate) && !isValidDate(endDate)) {
    return events;
  }

  return events.filter((e) => {
    const date = parseEventDate(e.createdAt);
    // When a range is active, skip unparseable timestamps instead of letting them through.
    if (!date) return false;
    const time = date.getTime();
    if (isValidDate(startDate) && time < startDate.getTime()) return false;
    if (isValidDate(endDate) && time > endDate.getTime()) return false;
    return true;
  });
}
