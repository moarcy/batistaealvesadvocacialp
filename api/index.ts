import express from 'express';
import { registerRoutes } from '../server/routes';
import { createServer } from 'http';

let appInstance: any;
let initError: any;

try {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const httpServer = createServer(app);
  
  // Registrar rotas de forma síncrona/segura
  registerRoutes(httpServer, app).catch(err => {
    console.error("Route registration error", err);
  });
  
  appInstance = app;
} catch (err) {
  initError = err;
}

export default function handler(req: any, res: any) {
  if (initError) {
    console.error("Vercel Serverless Error:", initError);
    return res.status(500).json({ 
      error: "Vercel Serverless Initialization Error", 
      message: initError?.message || String(initError),
    });
  }
  
  return appInstance(req, res);
}
