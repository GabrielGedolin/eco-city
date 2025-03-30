import { neon } from '@neondatabase/serverless';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        // Validação básica dos campos
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        try {
            // Verifica se o e-mail já está cadastrado
            const existingUser = await sql`
                SELECT * FROM users WHERE email = ${email}
            `;

            if (existingUser.length > 0) {
                return res.status(400).json({ error: 'E-mail já cadastrado.' });
            }

            // Criptografa a senha
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insere o novo usuário no banco de dados
            const newUser = await sql`
                INSERT INTO users (name, email, password)
                VALUES (${name}, ${email}, ${hashedPassword})
                RETURNING id, name, email
            `;

            res.status(201).json({ user: newUser[0] });
        } catch (err) {
            console.error('Erro ao cadastrar usuário:', err);
            res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido.' });
    }
}