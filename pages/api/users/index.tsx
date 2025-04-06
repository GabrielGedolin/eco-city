// pages/api/users/index.ts
import { neon } from '@neondatabase/serverless';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const allowCors = (fn: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
  // ... (configurações CORS anteriores permanecem iguais)
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Verificação do token em produção
    if (process.env.NODE_ENV === 'production') {
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
      }

      const token = authHeader.split(' ')[1];
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        req.user = { userId: decoded.userId }; // Agora tipado corretamente
      } catch (jwtError) {
        console.error('Token Error:', jwtError);
        return res.status(401).json({ error: 'Token inválido ou expirado' });
      }
    }

    const sql = neon(process.env.DATABASE_URL!);
    const users = await sql`
      SELECT id, name, email, is_admin 
      FROM users
      ORDER BY name ASC
    `;
    
    // Exemplo de uso do req.user (opcional)
    if (req.user) {
      console.log('Usuário autenticado:', req.user.userId);
    }
    
    return res.status(200).json(users);
    
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : 'Erro desconhecido');
    return res.status(500).json({ error: 'Erro no servidor' });
  }
};

export default allowCors(handler);