import express from 'express';
import { registerRoutes } from '../server/routes';
import { createServer } from 'http';

let appInstance: any;

// Função de inicialização única (singleton) para o ambiente serverless
const getApp = async () => {
  if (appInstance) return appInstance;

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Mock do httpServer para o registerRoutes
  const httpServer = createServer(app);
  
  // Aguarda o registro das rotas e middlewares (incluindo o banco de dados)
  await registerRoutes(httpServer, app);
  
  appInstance = app;
  return appInstance;
};

export default async function handler(req: any, res: any) {
  try {
    const app = await getApp();
    // Encaminha a requisição para o Express
    return app(req, res);
  } catch (err: any) {
    console.error("ERRO CRITICO NA INICIALIZAÇÃO:", err);
    return res.status(500).json({ 
      error: "Erro de Inicialização na Vercel", 
      message: err?.message || String(err),
      details: "Verifique se a DATABASE_URL está configurada corretamente nas Settings da Vercel."
    });
  }
}
