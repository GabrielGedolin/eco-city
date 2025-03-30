import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Page() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Erro ao fazer login');
      }

      const { user, token } = await response.json();
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', token);
      
      router.push(user.is_admin ? '/UserAdmin' : '/');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Acesso | Portal</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />
      </Head>

      <div className="min-vh-100 d-flex align-items-center bg-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="text-center mb-5">
                <h1 className="display-5 fw-bold text-black mb-3">LOGIN</h1>
                <p className="text-muted">Entre com suas credenciais para continuar</p>
              </div>
              
              <div className="card border-0 shadow-none">
                {error && (
                  <div className="alert alert-dark alert-dismissible fade show rounded-0" role="alert">
                    {error}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setError('')}
                    ></button>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                  <div className="mb-4">
                    <input
                      type="email"
                      className="form-control border-0 border-bottom rounded-0 p-3 bg-transparent"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-4 position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control border-0 border-bottom rounded-0 p-3 bg-transparent"
                      placeholder="Senha"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={3}
                    />
                    <button 
                      type="button" 
                      className="position-absolute end-0 top-50 translate-middle-y bg-transparent border-0"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ right: '10px' }}
                    >
                      {showPassword ? (
                        <span className="text-black">Ocultar</span>
                      ) : (
                        <span className="text-black">Mostrar</span>
                      )}
                    </button>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="form-check">
                      <input 
                        type="checkbox" 
                        className="form-check-input border-black rounded-0" 
                        id="lembrar" 
                      />
                      <label 
                        htmlFor="lembrar" 
                        className="form-check-label text-black small"
                      >
                        Lembrar acesso
                      </label>
                    </div>
                    <Link 
                      href="/recuperar-senha" 
                      className="text-decoration-none text-black small"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  
                  <div className="d-grid mb-4">
                    <button
                      type="submit"
                      className="btn btn-dark rounded-0 py-3 fw-bold"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      ) : null}
                      ENTRAR
                    </button>
                  </div>
                </form>
                
                <div className="text-center mt-4">
                  <p className="text-black small">
                    Não possui conta?{' '}
                    <Link 
                      href="/cadastrar" 
                      className="text-decoration-underline text-black"
                    >
                      Criar acesso
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        body {
          background-color: #ffffff;
        }
        
        .form-control {
          transition: all 0.3s ease;
        }
        
        .form-control:focus {
          box-shadow: none;
          border-color: #000 !important;
        }
        
        .btn-dark {
          background-color: #000;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }
        
        .btn-dark:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
        
        .alert-dark {
          background-color: #000;
          color: #fff;
          border-radius: 0;
        }
        
        .form-check-input:checked {
          background-color: #000;
          border-color: #000;
        }
        
        @media (max-width: 768px) {
          .display-5 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </>
  );
}