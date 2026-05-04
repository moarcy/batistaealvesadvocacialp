import { type User, type InsertUser, type AnalyticsEvent, type InsertAnalyticsEvent, users, analyticsEvents } from "../shared/schema.js";
import { db } from "./db.js";
import { eq, and, gte, lte } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  trackEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getMetrics(startDate?: Date, endDate?: Date): Promise<{
    uniqueVisits: number;
    totalVisits: number;
    totalClicks: number;
    ctr: string;
    eventsByDate: any[];
    pageViewsByPath: Record<string, number>;
    clicksByPath: Record<string, number>;
    avgTimeOnPage: number;
    referrers: Record<string, number>;
    scrollDepthByPath: Record<string, { d50: number; d100: number }>;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async trackEvent(insertAnalyticsEvent: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [event] = await db.insert(analyticsEvents).values(insertAnalyticsEvent).returning();
    return event;
  }

  async getMetrics(startDate?: Date, endDate?: Date) {
    let query = db.select().from(analyticsEvents);
    // Simple filter in memory for simplicity of implementation in this context
    const allEvents = await query;
    
    let filteredEvents = allEvents;
    if (startDate || endDate) {
      filteredEvents = allEvents.filter(e => {
        try {
          // Normaliza o timestamp do Postgres para ISO
          // Exemplos: '2024-05-04 21:00:00' -> '2024-05-04T21:00:00Z'
          let raw = e.createdAt;
          if (!raw.includes('T')) raw = raw.replace(' ', 'T');
          if (!raw.endsWith('Z') && !raw.includes('+') && !raw.includes('-')) raw += 'Z';
          
          const date = new Date(raw);
          if (isNaN(date.getTime())) {
            console.warn(`Data inválida detectada no evento ${e.id}: ${e.createdAt}`);
            return false;
          }

          if (startDate && date.getTime() < startDate.getTime()) return false;
          if (endDate && date.getTime() > endDate.getTime()) return false;
          return true;
        } catch (err) {
          console.error("Erro ao processar data do evento:", err);
          return false;
        }
      });
    }

    const totalVisits = filteredEvents.filter(e => e.eventType === 'pageview').length;
    const totalClicks = filteredEvents.filter(e => e.eventType === 'click').length;
    
    // Calculate unique visits by unique session IDs that had a pageview
    const uniqueSessions = new Set(
      filteredEvents.filter(e => e.eventType === 'pageview').map(e => e.sessionId)
    );
    const uniqueVisits = uniqueSessions.size;

    const ctr = totalVisits > 0 ? ((totalClicks / totalVisits) * 100).toFixed(2) : "0.00";

    // Grouping by Date for charts
    const byDate = new Map<string, { visits: number; clicks: number }>();
    for (const e of filteredEvents) {
      const dateKey = new Date(e.createdAt).toISOString().split('T')[0];
      if (!byDate.has(dateKey)) {
        byDate.set(dateKey, { visits: 0, clicks: 0 });
      }
      const dayData = byDate.get(dateKey)!;
      if (e.eventType === 'pageview') dayData.visits++;
      if (e.eventType === 'click') dayData.clicks++;
    }

    const eventsByDate = Array.from(byDate.entries()).map(([date, data]) => ({
      date,
      visits: data.visits,
      clicks: data.clicks
    })).sort((a, b) => a.date.localeCompare(b.date));

    const pageViewsByPath: Record<string, number> = {};
    const clicksByPath: Record<string, number> = {};
    const referrers: Record<string, number> = {};
    const scrollDepthByPath: Record<string, { d50: number; d100: number }> = {};
    let totalTimeSeconds = 0;
    let timeOnPageCount = 0;

    for (const e of filteredEvents) {
      const meta = (e.metadata as Record<string, any> | null) ?? {};
      if (e.eventType === 'pageview') {
        pageViewsByPath[e.path] = (pageViewsByPath[e.path] || 0) + 1;
        if (meta.referrer) {
          referrers[meta.referrer] = (referrers[meta.referrer] || 0) + 1;
        }
      }
      if (e.eventType === 'click') {
        clicksByPath[e.path] = (clicksByPath[e.path] || 0) + 1;
      }
      if (e.eventType === 'time_on_page' && typeof meta.seconds === 'number') {
        totalTimeSeconds += meta.seconds;
        timeOnPageCount++;
      }
      if (e.eventType === 'scroll_depth') {
        if (!scrollDepthByPath[e.path]) scrollDepthByPath[e.path] = { d50: 0, d100: 0 };
        if (meta.depth === 50) scrollDepthByPath[e.path].d50++;
        if (meta.depth === 100) scrollDepthByPath[e.path].d100++;
      }
    }

    const avgTimeOnPage = timeOnPageCount > 0 ? Math.round(totalTimeSeconds / timeOnPageCount) : 0;

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
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private analyticsEvents: AnalyticsEvent[];
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.analyticsEvents = [];
    this.currentId = 1;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id.toString(), user);
    return user;
  }

  async trackEvent(insertAnalyticsEvent: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const event: AnalyticsEvent = {
      ...insertAnalyticsEvent,
      id: this.currentId++,
      createdAt: new Date().toISOString()
    };
    this.analyticsEvents.push(event);
    return event;
  }

  async getMetrics(startDate?: Date, endDate?: Date) {
    let filteredEvents = this.analyticsEvents;
    if (startDate || endDate) {
      filteredEvents = this.analyticsEvents.filter(e => {
        const rawDate = e.createdAt.includes('T') ? e.createdAt : e.createdAt.replace(' ', 'T');
        const normalized = rawDate.endsWith('Z') || rawDate.includes('+') ? rawDate : rawDate + 'Z';
        const date = new Date(normalized);
        if (startDate && date < startDate) return false;
        if (endDate && date > endDate) return false;
        return true;
      });
    }

    const totalVisits = filteredEvents.filter(e => e.eventType === 'pageview').length;
    const totalClicks = filteredEvents.filter(e => e.eventType === 'click').length;
    
    const uniqueSessions = new Set(
      filteredEvents.filter(e => e.eventType === 'pageview').map(e => e.sessionId)
    );
    const uniqueVisits = uniqueSessions.size;

    const ctr = totalVisits > 0 ? ((totalClicks / totalVisits) * 100).toFixed(2) : "0.00";

    const byDate = new Map<string, { visits: number; clicks: number }>();
    for (const e of filteredEvents) {
      const dateKey = new Date(e.createdAt).toISOString().split('T')[0];
      if (!byDate.has(dateKey)) {
        byDate.set(dateKey, { visits: 0, clicks: 0 });
      }
      const dayData = byDate.get(dateKey)!;
      if (e.eventType === 'pageview') dayData.visits++;
      if (e.eventType === 'click') dayData.clicks++;
    }

    const eventsByDate = Array.from(byDate.entries()).map(([date, data]) => ({
      date,
      visits: data.visits,
      clicks: data.clicks
    })).sort((a, b) => a.date.localeCompare(b.date));

    const pageViewsByPath: Record<string, number> = {};
    const clicksByPath: Record<string, number> = {};
    const referrers: Record<string, number> = {};
    const scrollDepthByPath: Record<string, { d50: number; d100: number }> = {};
    let totalTimeSeconds = 0;
    let timeOnPageCount = 0;

    for (const e of filteredEvents) {
      const meta = (e.metadata as Record<string, any> | null) ?? {};
      if (e.eventType === 'pageview') {
        pageViewsByPath[e.path] = (pageViewsByPath[e.path] || 0) + 1;
        if (meta.referrer) {
          referrers[meta.referrer] = (referrers[meta.referrer] || 0) + 1;
        }
      }
      if (e.eventType === 'click') {
        clicksByPath[e.path] = (clicksByPath[e.path] || 0) + 1;
      }
      if (e.eventType === 'time_on_page' && typeof meta.seconds === 'number') {
        totalTimeSeconds += meta.seconds;
        timeOnPageCount++;
      }
      if (e.eventType === 'scroll_depth') {
        if (!scrollDepthByPath[e.path]) scrollDepthByPath[e.path] = { d50: 0, d100: 0 };
        if (meta.depth === 50) scrollDepthByPath[e.path].d50++;
        if (meta.depth === 100) scrollDepthByPath[e.path].d100++;
      }
    }

    const avgTimeOnPage = timeOnPageCount > 0 ? Math.round(totalTimeSeconds / timeOnPageCount) : 0;

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
}

export const storage = process.env.DATABASE_URL 
  ? new DatabaseStorage() 
  : new MemStorage();
