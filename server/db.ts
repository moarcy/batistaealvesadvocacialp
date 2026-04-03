import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.error("ERRO CRITICO: DATABASE_URL não encontrada no ambiente. Você configurou as Environment Variables na Vercel?");
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL || "postgresql://dummy_so_it_fails_safely@localhost/db" });
export const db = drizzle({ client: pool, schema });
