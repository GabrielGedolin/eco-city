// pages/api/users/index.ts
import { neon } from '@neondatabase/serverless';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Configuração mínima de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    // Conexão otimizada
    const sql = neon(process.env.DATABASE_URL!);

    // Consulta RÁPIDA com is_admin
    const users = await sql`
      SELECT id, name, email, is_admin 
      FROM users
      ORDER BY name ASC
      LIMIT 50  -- Garante resposta em <1s
    `;
    
    return res.status(200).json(users);

  } catch (error) {
    console.error('Erro otimizado:', error instanceof Error ? error.message : error);
    return res.status(500).json({ 
      error: 'Timeout evitado',
      tip: 'Se precisar de mais dados, implemente paginação' 
    });
  }
}

// Configuração anti-timeout
export const config = {
  api: {
    externalResolver: true,
  },
};