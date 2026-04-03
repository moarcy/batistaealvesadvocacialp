import express from 'express';
import { registerRoutes } from '../server/routes';
import { createServer } from 'http';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);

// We need an IIFE or similar, but for Serverless we just call it directly
registerRoutes(httpServer, app).catch(console.error);

export default app;
