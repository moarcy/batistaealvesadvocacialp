import { type User, type InsertUser, type AnalyticsEvent, type InsertAnalyticsEvent, users, analyticsEvents } from "@shared/schema";
import { db } from "./db";
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
        const date = new Date(e.createdAt);
        if (startDate && date < startDate) return false;
        if (endDate && date > endDate) return false;
        return true;
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

    return {
      uniqueVisits,
      totalVisits,
      totalClicks,
      ctr,
      eventsByDate
    };
  }
}

export const storage = new DatabaseStorage();
