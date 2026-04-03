import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import createMemoryStore from "memorystore";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const MemoryStore = createMemoryStore(session);

  // Setup simple session for authentication
  app.use(
    session({
      cookie: { maxAge: 86400000 },
      store: new MemoryStore({
        checkPeriod: 86400000,
      }),
      resave: false,
      saveUninitialized: false,
      secret: "batista_alves_analytics_secret",
    })
  );

  // Simple auth endpoint
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "batistaealvesadvocacia" && password === "Admin123!") {
      (req.session as any).authenticated = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Credenciais inválidas" });
    }
  });

  app.post("/api/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/auth-status", (req, res) => {
    res.json({ authenticated: !!(req.session as any).authenticated });
  });

  // Track event endpoint (public)
  app.post("/api/analytics/track", async (req, res) => {
    try {
      const { eventType, path, sessionId } = req.body;
      
      if (!eventType || !path || !sessionId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      await storage.trackEvent({
        eventType,
        path,
        sessionId,
      });

      res.status(200).json({ success: true });
    } catch (e) {
      console.error("Error tracking event", e);
      res.status(500).json({ error: "Failed to track event" });
    }
  });

  // Fetch metrics endpoint (protected)
  app.get("/api/analytics/metrics", async (req, res) => {
    if (!(req.session as any).authenticated) {
      return res.status(401).json({ error: "Não autorizado" });
    }

    try {
      const { startDate, endDate } = req.query;
      
      let start: Date | undefined = undefined;
      let end: Date | undefined = undefined;

      if (typeof startDate === "string") start = new Date(startDate);
      if (typeof endDate === "string") {
        end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
      }

      const metrics = await storage.getMetrics(start, end);
      res.json(metrics);
    } catch (e) {
      console.error("Error fetching metrics", e);
      res.status(500).json({ error: "Failed to fetch metrics" });
    }
  });

  return httpServer;
}
