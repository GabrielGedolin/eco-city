// hocs/withAuthAdmin.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

const withAuthAdmin = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (!token || !userData) {
        toast.error('Acesso não autorizado');
        router.push('/login');
        return;
      }

      try {
        const user = JSON.parse(userData);
        if (!user.is_admin) {
          toast.error('Você não tem permissão de administrador');
          router.push('/');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuthAdmin;