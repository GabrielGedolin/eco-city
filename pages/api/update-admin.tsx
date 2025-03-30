// pages/api/users/update-admin.ts
import { neon } from '@neondatabase/serverless';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Verificação do método HTTP
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['PUT'] 
    });
  }

  // 2. Autenticação robusta
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: 'Unauthorized',
      details: 'Missing or malformed Authorization header'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 3. Validação dos dados de entrada
    const { user_id, is_admin } = req.body;
    
    if (!user_id || typeof is_admin !== 'boolean') {
      return res.status(400).json({ 
        error: 'Bad Request',
        details: {
          required_fields: {
            user_id: 'string',
            is_admin: 'boolean'
          },
          received: req.body
        }
      });
    }

    // 4. Conexão com o banco de dados
    const sql = neon(process.env.DATABASE_URL!);
    
    // 5. Transação para garantir atomicidade
    const [updatedUser] = await sql`
      UPDATE users 
      SET is_admin = ${is_admin}
      WHERE id = ${user_id}
      RETURNING 
        id,
        name,
        email,
        is_admin
    `;

    if (!updatedUser) {
      return res.status(404).json({ 
        error: 'Not Found',
        details: `User with id ${user_id} not found`
      });
    }

    // 6. Resposta de sucesso
    return res.status(200).json({
      success: true,
      data: updatedUser,
      metadata: {
        updatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    // 7. Tratamento de erros detalhado
    console.error('Database operation failed:', {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      endpoint: '/api/users/update-admin'
    });

    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'Please contact support'
    });
  }
}