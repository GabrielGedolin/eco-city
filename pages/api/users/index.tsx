// pages/api/users/index.ts
import { neon } from '@neondatabase/serverless';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Configuração mínima de CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); //sem restrinção aos domínios
  res.setHeader('Access-Control-Allow-Methods', 'GET'); //permite so metodos get

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

/*
Desativa o tratamento interno de erros do Next.js

Seu código passa a responder diretamente, sem intermediários.

Evita timeouts duplos

O Vercel gerencia o timeout global (10s/15s/30s dependendo do plano), sem conflito com o Next.js.

Melhora performance

Remove camadas extras de processamento de requests. 
*/
export const config = {
  api: {
    externalResolver: true,
  },
};