import { type User, type InsertUser, type AnalyticsEvent, type InsertAnalyticsEvent, users, analyticsEvents } from "../shared/schema.js";
import { db } from "./db.js";
import { eq } from "drizzle-orm";
import {
  aggregateMetrics,
  filterEventsByDateRange,
} from "./analytics-utils.js";

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
    const allEvents = await db.select().from(analyticsEvents);
    const filteredEvents = filterEventsByDateRange(allEvents, startDate, endDate);
    return aggregateMetrics(filteredEvents);
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
    const user: User = { ...insertUser, id: String(id) };
    this.users.set(String(id), user);
    return user;
  }

  async trackEvent(insertAnalyticsEvent: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const event: AnalyticsEvent = {
      ...insertAnalyticsEvent,
      id: String(this.currentId++),
      createdAt: new Date().toISOString(),
      metadata: insertAnalyticsEvent.metadata ?? null,
    };
    this.analyticsEvents.push(event);
    return event;
  }

  /** Test helper: insert an event with an explicit createdAt (Postgres-like formats). */
  seedEvent(
    insertAnalyticsEvent: InsertAnalyticsEvent,
    createdAt: string,
  ): AnalyticsEvent {
    const event: AnalyticsEvent = {
      ...insertAnalyticsEvent,
      id: String(this.currentId++),
      createdAt,
      metadata: insertAnalyticsEvent.metadata ?? null,
    };
    this.analyticsEvents.push(event);
    return event;
  }

  async getMetrics(startDate?: Date, endDate?: Date) {
    const filteredEvents = filterEventsByDateRange(
      this.analyticsEvents,
      startDate,
      endDate,
    );
    return aggregateMetrics(filteredEvents);
  }
}

export const storage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : new MemStorage();
