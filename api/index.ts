import express from 'express';

let appPromise: Promise<any>;

try {
  const init = async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    const { registerRoutes } = await import('../server/routes');
    const { createServer } = await import('http');
    
    const httpServer = createServer(app);
    await registerRoutes(httpServer, app);
    
    return app;
  };
  appPromise = init();
} catch (err) {
  appPromise = Promise.reject(err);
}

export default async function handler(req: any, res: any) {
  try {
    const app = await appPromise;
    return app(req, res);
  } catch (err: any) {
    console.error("Vercel Serverless Error:", err);
    res.status(500).json({ 
      error: "Vercel Serverless Initialization Error", 
      message: err?.message || String(err),
      stack: err?.stack
    });
  }
}
