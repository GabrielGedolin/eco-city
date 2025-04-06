// types/next-auth.d.ts ou em seu arquivo de API
import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    user?: {
      userId: string;
      // Adicione outras propriedades do usuário conforme necessário
    };
  }
}