import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import "../public/style/styles.css";
import { Analytics } from "@vercel/analytics/react";
import Head from 'next/head';
import Script from 'next/script';
import { AuthProvider } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Mova a configuração do interceptador para dentro do AuthProvider
    if (typeof window !== 'undefined') {
      const originalFetch = window.fetch;
      
      window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        const token = localStorage.getItem('token');
        
        const headers = new Headers(init?.headers);
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }

        const response = await originalFetch(input, { ...init, headers });
        
        if (response.status === 401) {
          localStorage.removeItem('token');
          toast.error('Sessão expirada. Faça login novamente.');
          router.push('/login');
        }

        return response;
      };

      return () => {
        window.fetch = originalFetch;
      };
    }
  }, [router]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" 
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      
      <Script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossOrigin="anonymous"
      />
      
      <Analytics />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;