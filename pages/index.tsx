import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';




// Carrega o componente do mapa dinamicamente (apenas no cliente)
const MapaComponent = dynamic(() => import('../src/components/MapaComponent'), { ssr: false });

const Home = () => {
    
  // Inicializa o AOS apenas no lado do cliente
    return (
    <>
      <Head>
        <title>ECO CITY</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00FF00" />
        <link rel="icon" href="/img/Logo (2).png" />
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" 
          crossOrigin="anonymous"
        />
      </Head>
      
      <Script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossOrigin="anonymous"
      />

      {/* Scripts usando o componente <Script> do Next.js */}
      <Script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js" strategy="afterInteractive" />
      <Script src="https://kit.fontawesome.com/3a47ab78fd.js" strategy="afterInteractive" />

      {/* Conteúdo principal */}
      <div data-bs-spy="scroll" data-bs-target=".navbar">
        {/* NAVBAR */}
        <nav className="navbar navbar-expand-lg sticky-top bg-light bg-opacity-50">
          <div className="container">
            <Link href="/" passHref className="navbar-brand">
              <img src="/img/Logo1.png" alt="ECO CITY Logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" href="/sobre">
                    Sobre
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/mapa">
                    Mapa
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/sign-up">
                    Cadastrar
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section id="hero" className="min-vh-100 d-flex align-items-center text-center">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 data-aos="fade-left" className="text-uppercase text-gradient fw-semibold display-1">
                  Seja bem-vindo ao
                </h1>
                <h1 data-aos="fade-left" className="text-uppercase text-gradient2 fw-semibold display-1" id="h11">
                  ECO CITY
                </h1>
                <h5 className="text-white mt-3 mb-4" data-aos="fade-right">
                  Transforme sua Cidade, Transforme o Planeta!
                </h5>
              </div>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="about" className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center" data-aos="fade-down" data-aos-delay="50">
                <div className="section-title">
                  <h1 className="display-4 fw-semibold">Sobre nós</h1>
                  <div className="line"></div>
                  <p>NÓS SOMOS UM GRUPO DE DEV'S QUE BUSCAM SOLUÇÕES ECOLÓGICAS</p>
                </div>
                <div data-aos="fade-up" data-aos-delay="50" style={{ marginTop: '20px' }}>
                  <Link href="/sobre" className="btn btn-brand2 me-2" style={{ borderRadius: '5%' }}>
                    Ver Mais
                  </Link>
                </div>
              </div>
            </div>
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-6" data-aos="fade-down" data-aos-delay="50">
                {/* Mapa */}
                <MapaComponent />
                <div data-aos="fade-up" data-aos-delay="50" style={{ marginTop: '20px' }}>
                  <Link href="/mapa" className="btn btn-brand me-2" style={{ borderRadius: '5%' }}>
                    Ver Mapa
                  </Link>
                </div>
              </div>
              <div data-aos="fade-down" data-aos-delay="150" className="col-lg-5">
                <h1>ECOLOGIA</h1>
                <p className="mt-3 mb-4">Um projeto de combate à poluição.</p>

                <div className="d-flex pt-4 mb-3">
                  <div
                    className="iconbox me-4"
                    style={{ borderRadius: '20%', overflow: 'hidden', padding: '10px', background: '#f0f0f0' }}
                  >
                    <i>
                      <img src="/img/point.png" alt="Ponto de Coleta" />
                    </i>
                  </div>
                  <div>
                    <h5>Encontre pontos de coleta próximos</h5>
                    <p>
                      Descubra locais adequados para descartar seus resíduos eletrônicos e recicláveis com nosso Mapa
                      Verde: Encontre, Recicle, Preserve!.
                    </p>
                  </div>
                </div>

                <div className="d-flex mb-3">
                  <div
                    className="iconbox me-4"
                    style={{ borderRadius: '20%', overflow: 'hidden', padding: '10px', background: '#f0f0f0' }}
                  >
                    <i>
                      <img src="/img/reciclar.png" alt="Reciclar" />
                    </i>
                  </div>
                  <div>
                    <h5>Saiba como reciclar corretamente</h5>
                    <p>
                      Acesse informações detalhadas sobre a reciclagem de eletrônicos, seus impactos ambientais e como
                      descartar cada tipo de resíduo da melhor forma.
                    </p>
                  </div>
                </div>

                <div className="d-flex">
                  <div
                    className="iconbox me-4"
                    style={{ borderRadius: '20%', overflow: 'hidden', padding: '10px', background: '#f0f0f0' }}
                  >
                    <i className="ri-rocket-2-fill" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h5>Receba notificações e participe de eventos</h5>
                    <p>
                      Fique por dentro de campanhas, mutirões de reciclagem e iniciativas ambientais na sua cidade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        {/* COUNTER */}
        <section
          id="counter"
          className="section-padding d-flex align-items-center"
          style={{
            background:
              "url('https://images.pexels.com/photos/589802/pexels-photo-589802.jpeg?cs=srgb&dl=pexels-valiphotos-589802.jpg&fm=jpg') no-repeat center center/cover",
            height: '100vh',
          }}
        >
          <div className="container d-flex flex-column justify-content-center align-items-center text-center">
            <div className="row g-4">
              <div className="col-lg-12" data-aos="fade-down" data-aos-delay="250">
                <div
                  className="p-4 rounded"
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(5px)',
                    borderRadius: '10px',
                  }}
                >
                  <h1 className="text-dark display-6">Educação e Sustentabilidade Caminham Juntas</h1>
                  <h6 className="text-uppercase mb-0 text-dark mt-3">Cada Ponto de Coleta, Um Passo para o Futuro!</h6>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="services" className="section-padding border-top">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center" data-aos="fade-down" data-aos-delay="150">
                <div className="section-title">
                  <h1 className="display-4 fw-semibold">SERVIÇOS</h1>
                  <div className="line"></div>
                </div>
              </div>
            </div>
            <div className="row g-4 text-center">
              <div className="col-lg-4 col-sm-6" data-aos="fade-down" data-aos-delay="150">
                <div className="service theme-shadow p-lg-5 p-4 bg-light">
                  <div className="iconbox">
                    <i className="fa-solid fa-map"aria-hidden="true"></i>
                  </div>
                  <h5 className="mt-4 mb-3">Mapa Interativo</h5>
                  <p>Mostra locais de coleta próximos, filtrados por tipo de resíduo.</p>
                </div>
              </div>

              <div className="col-lg-4 col-sm-6" data-aos="fade-down" data-aos-delay="250">
                <div className="service theme-shadow p-lg-5 p-4 bg-light">
                  <div className="iconbox">
                    <i className="fa-solid fa-file-contract"aria-hidden="true"></i>
                  </div>
                  <h5 className="mt-4 mb-3">Informações sobre Reciclagem</h5>
                  <p>Contagem de coletas por.</p>
                </div>
              </div>

              <div className="col-lg-4 col-sm-6" data-aos="fade-down" data-aos-delay="350">
                <div className="service theme-shadow p-lg-5 p-4 bg-light">
                  <div className="iconbox">
                    <i className="fa-solid fa-calendar-days" aria-hidden="true"></i>
                  </div>
                  <h5 className="mt-4 mb-3">Agenda de Coleta e Eventos</h5>
                  <p>Informações sobre mutirões de reciclagem e feiras ecológicas.</p>
                </div>
              </div>

              <div className="col-lg-4 col-sm-6" data-aos="fade-down" data-aos-delay="450">
                <div className="service theme-shadow p-lg-5 p-4 bg-light">
                  <div className="iconbox">
                    <i className="fa-solid fa-users" aria-hidden="true"></i>
                  </div>
                  <h5 className="mt-4 mb-3">Cadastro de Usuário</h5>
                  <p>Ao se cadastrar pode-se solicitar pontos novos de coleta.</p>
                </div>
              </div>

              <div className="col-lg-4 col-sm-6" data-aos="fade-down" data-aos-delay="550">
                <div className="service theme-shadow p-lg-5 p-4 bg-light">
                  <div className="iconbox">
                    <i className="ri-code-box-line"></i>
                  </div>
                  <h5 className="mt-4 mb-3">Blog e Notícias Ambientais</h5>
                  <p>Dicas ecológicas, novidades sobre reciclagem e meio ambiente e tendências sustentáveis.</p>
                </div>
              </div>

              <div className="col-lg-4 col-sm-6" data-aos="fade-down" data-aos-delay="650">
                <div className="service theme-shadow p-lg-5 p-4 bg-light">
                  <div className="iconbox">
                    <i className="fa-solid fa-magnifying-glass-location" aria-hidden="true"></i>
                  </div>
                  <h5 className="mt-4 mb-3">Denúncias e Solicitações</h5>
                  <p>
                    Espaço para relatar descarte irregular na cidade e solicitação de instalação de novos pontos de
                    coleta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="section-padding">
          <div className="container-fluid bg-light py-5 px-4" style={{ borderRadius: '5%' }}>
            <div className="row">
              <div className="col-12 text-center" data-aos="fade-down" data-aos-delay="150">
                <div className="section-title">
                  <div className="line"></div>
                  <h5 className="mt-4 mb-3">Apoie a causa.</h5>
                </div>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-md-4 aos-init aos-animate" data-aos="fade-down" data-aos-delay="150">
                <div className="portfolio-item image-zoom">
                  <div className="image-zoom-wrapper" style={{ borderRadius: '5%' }}>
                    <img src="/img/project-1.png" alt="Projeto 1"/>
                  </div>
                  <a href="/assets/images/project-1.png" data-fancybox="gallery" className="iconbox">
                    <i className="ri-search-2-line" aria-hidden="true"></i>
                  </a>
                </div>
                <div className="portfolio-item image-zoom mt-4">
                  <div className="image-zoom-wrapper" style={{ borderRadius: '5%' }}>
                    <img src="/img/project-2.png" alt="Projeto 2" />
                  </div>
                  <a href="/assets/images/project-2.png" data-fancybox="gallery" className="iconbox">
                    <i className="ri-search-2-line" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-4" data-aos="fade-down" data-aos-delay="250">
                <div className="portfolio-item image-zoom">
                  <div className="image-zoom-wrapper" style={{ borderRadius: '5%' }}>
                    <img src="/img/project-3.png" alt="Projeto 3" />
                  </div>
                  <a href="/img/project-3.png" data-fancybox="gallery" className="iconbox">
                    <i className="ri-search-2-line" aria-hidden="true"></i>
                  </a>
                </div>
                <div className="portfolio-item image-zoom mt-4">
                  <div className="image-zoom-wrapper" style={{ borderRadius: '5%' }}>
                    <img src="/img/project-4.png" alt="Projeto 4" />
                  </div>
                  <a href="/img/project-4.png" data-fancybox="gallery" className="iconbox">
                    <i className="ri-search-2-line" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-4" data-aos="fade-down" data-aos-delay="350">
                <div className="portfolio-item image-zoom">
                  <div className="image-zoom-wrapper" style={{ borderRadius: '5%' }}>
                    <img
                      src="https://greeneletron.org.br/blog/wp-content/uploads/2022/07/reciclagem2.jpg"
                      alt="Reciclagem"
                    />
                  </div>
                  <a
                    href="https://greeneletron.org.br/blog/wp-content/uploads/2022/07/reciclagem2.jpg"
                    data-fancybox="gallery"
                    className="iconbox"
                  >
                    <i className="ri-search-2-line" aria-hidden="true"></i>
                  </a>
                </div>
                <div className="portfolio-item image-zoom mt-4">
                  <div className="image-zoom-wrapper" style={{ borderRadius: '5%' }}>
                    <img src="/img/project-6.png" alt="Projeto 6" />
                  </div>
                  <a href="/img/project-6.png" data-fancybox="gallery" className="iconbox">
                    <i className="ri-search-2-line" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-dark">
          <div className="footer-top">
            <div className="container">
              <div className="row gy-5">
                <div className="col-lg-3 col-sm-6">
                  <a href="#">
                    <img src="/img/Logo1.png" alt="ECO CITY Logo" />
                  </a>
                  <div className="line"></div>
                  <p>ECO CITY sempre buscando o melhor pra você e para o Mundo.</p>
                  <div className="social-icons">
                    <a href="https://github.com/GabrielGedolin/eco-city-2.git">
                      <i className="ri-github-fill" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <h5 className="mb-0 text-white">SERVIÇOS</h5>
                  <div className="line"></div>
                  <ul>
                    <li>
                      <a href="/mapa-zonas">Mapa - Áreas verdes</a>
                    </li>
                    <li>
                      <a href="/denuncias">Denuncias</a>
                    </li>
                    <li>
                      <a href="/mapa">Mapa - Pontos de Coleta</a>
                    </li>
                   
                    <li>
                      <a href="/blog">Blog</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <h5 className="mb-0 text-white">SOBRE</h5>
                  <div className="line"></div>
                  <ul>
                    
                    <li>
                      <a href="/sobre">Sobre</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <h5 className="mb-0 text-white">CONTATO</h5>
                  <div className="line"></div>
                  <ul>
                    <li>Presidente P.</li>
                    <li>(18) 98712 - 2539</li>
                    <li>(18) 99676 - 9535</li>
                    <li>gustavo.sesi.bol@gmail.com</li>
                    <li>gabrielgedoli@gmail.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="row g-4 justify-content-between">
                <div className="col-auto">
                  <p className="mb-0">© Copyright ECO CITY All Rights Reserved</p>
                </div>
                <div className="col-auto">
                  <p className="mb-0">Designed By GUSTAVO/GABRIEL</p>
                </div>
              </div>
            </div>
          </div>
        </footer>

       
      </div>
    </>
  );
};

export default Home;