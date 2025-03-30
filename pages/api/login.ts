import { neon } from '@neondatabase/serverless';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Configuração de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Método não permitido',
      solution: 'Use POST para enviar credenciais'
    });
  }

  try {
    // Verificação básica do corpo
    if (!req.body) {
      return res.status(400).json({ error: 'Corpo da requisição vazio' });
    }

    const { email, password } = req.body;

    // Validações mínimas
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'E-mail inválido' });
    }

    

    const sql = neon(process.env.DATABASE_URL!);
    
    // Consulta usando sua estrutura de tabela
    const result = await sql`
      SELECT 
        id,
        name,
        email,
        password,
        is_admin,
        created_at
      FROM users 
      WHERE email = ${email.trim().toLowerCase()}
      LIMIT 1
    `;

    // Verificação de usuário
    if (!result || result.length === 0) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const user = result[0];
    
    // Comparação de senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Resposta de sucesso
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
        created_at: user.created_at
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ 
      error: 'Erro interno no servidor',
      ...(process.env.NODE_ENV === 'development' && {
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    });
  }
}