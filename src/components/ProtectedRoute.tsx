// components/withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function withAuth(Component: React.ComponentType) {
    return function ProtectedRoute(props: any) {
        const router = useRouter();

        useEffect(() => {
            // Verifica se o token está no localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                // Redireciona para a página de login se não houver token
                router.push('/sign-in');
            }
        }, []);

        // Renderiza o componente protegido
        return <Component {...props} />;
    };
}