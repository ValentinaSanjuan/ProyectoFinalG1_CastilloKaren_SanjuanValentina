// Importación de dependencias necesarias de React y otras librerías
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Componentes/Context/AuthContext'; // Hook personalizado de autenticación
import { useNavigate } from 'react-router-dom'; // Hook de navegación de React Router
import './Header.css'; // Estilos del encabezado
import logo1 from '../../assets/img1.png'; // Imagen del logo principal
import logo3 from '../../assets/img3.png'; // Imagen adicional del logo
import { HashLink } from 'react-router-hash-link'; // Componente para enlaces con hash (anclas internas)

// Componente principal Header
const Header = () => {
    // Extracción de valores y funciones del contexto de autenticación
    const { currentUser, userRole, logout } = useAuth();
    const navigate = useNavigate();

    // Estados para manejar el menú, el dropdown y el carrusel
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    // Función para redirigir a la página de login y hacer scroll a la sección de inicio de sesión
    const handleLoginClick = () => {
        navigate('/login');
        setTimeout(() => {
            const section = document.getElementById('login-section');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    };

    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/PublicHomePage');
            setIsMenuOpen(false);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    // Función para ir al dashboard
    const handleDashboard = () => {
        navigate('/dashboard');
        setIsMenuOpen(false);
    };

    // Función para redirigir al inicio
    const handleHomeClick = () => {
        navigate('/');
        setIsMenuOpen(false);
    };

    // Lista de imágenes usadas en el carrusel
    const carouselImages = [
        "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=2069&q=80"
    ];

    // Efecto para la rotación automática del carrusel cada 4 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % carouselImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Encabezado principal con efecto glass */}
            <header className="glass-header">
                <div className="header-top">
                    <div className="header-container">

                        {/* Sección del logo que redirige al inicio */}
                        <div className="header-brand" onClick={handleHomeClick}>
                            <img src={logo1} alt="NotiSphere" className="header-logo" />
                            <span className="brand-text"><img src={logo3} alt="NotiSphere" className="header-logo" /></span>
                        </div>

                        {/* Navegación para vista de escritorio */}
                        <nav className="header-nav desktop-nav">
                            {currentUser ? (
                                <div className="user-menu">
                                    {/* Información del usuario autenticado */}
                                    <div className="user-info">
                                        <div className="user-avatar"><i className="bi bi-person-fill"></i></div>
                                        <div className="user-details">
                                            <span className="user-email">{currentUser.email}</span>
                                            <span className="user-role">{userRole}</span>
                                        </div>
                                    </div>

                                    {/* Botones de acciones del usuario */}
                                    <div className="nav-actions">
                                        <button onClick={handleDashboard} className="nav-btn primary">
                                            <i className="fas fa-tachometer-alt"></i> Dashboard
                                        </button>
                                        <button onClick={handleLogout} className="nav-btn secondary">
                                            <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // Botón de inicio de sesión cuando no hay usuario autenticado
                                <button onClick={handleLoginClick} className="nav-btn primary">
                                    <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
                                </button>
                            )}
                        </nav>

                        {/* Botón para abrir/cerrar el menú móvil */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span></span><span></span><span></span>
                        </button>
                    </div>
                </div>

                {/* Barra de navegación inferior con categorías */}
                <div className="header-bottom">
                    <nav className="integrated-navbar">
                        <div className="nav-container">
                            <div className="navbar-nav">
                                {/* Enlaces principales */}
                                <a className="nav-link" href="/PublicHomePage">
                                    <i className="fas fa-home me-1"></i> Inicio
                                </a>
                                <a className="nav-link" href="/PublicHomePage#noticias">
                                    <i className="fas fa-newspaper me-1"></i> Noticias
                                </a>

                                {/* Dropdown de categorías */}
                                <div
                                    className="nav-dropdown"
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    onMouseLeave={() => setIsDropdownOpen(false)}
                                >
                                    <button
                                        className="nav-link"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <i className="fas fa-tags me-1"></i> Categorías
                                        <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'} ms-1`}></i>
                                    </button>

                                    {/* Menú desplegable con categorías */}
                                    <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                        <li><a href="/PublicHomePage?category=Deportes#noticias">Deportes</a></li>
                                        <li><a href="/PublicHomePage?category=Cultura#noticias">Cultura</a></li>
                                        <li><a href="/PublicHomePage?category=Tecnología#noticias">Tecnología</a></li>
                                        <li><a href="/PublicHomePage?category=Política#noticias">Política</a></li>
                                        <li><a href="/PublicHomePage?category=Salud#noticias">Salud</a></li>
                                        <li><a href="/PublicHomePage?category=Economia#noticias">Economía</a></li>
                                        <li><a href="/PublicHomePage?category=Educacion#noticias">Educación</a></li>
                                    </ul>
                                </div>

                                {/* Enlace a la página de contacto */}
                                <a className="nav-link" href="/ContactPage">
                                    <i className="fas fa-envelope me-1"></i> Contacto
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Menú móvil (versión responsive) */}
            {isMenuOpen && (
                <div className="mobile-nav-overlay" onClick={() => setIsMenuOpen(false)}>
                    <div className="mobile-nav" onClick={(e) => e.stopPropagation()}>
                        {currentUser ? (
                            <>
                                {/* Información del usuario en el menú móvil */}
                                <div className="mobile-user-info">
                                    <div className="user-avatar"><i className="bi bi-person-fill"></i></div>
                                    <div>
                                        <p className="user-email">{currentUser.email}</p>
                                        <p className="user-role">{userRole}</p>
                                    </div>
                                </div>

                                {/* Botones del menú móvil */}
                                <button
                                    className="mobile-nav-btn"
                                    onClick={() => {
                                        handleDashboard();
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <i className="fas fa-tachometer-alt"></i> Dashboard
                                </button>
                                <button
                                    className="mobile-nav-btn logout"
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                                </button>
                            </>
                        ) : (
                            // Opción de iniciar sesión si no hay usuario
                            <button
                                className="mobile-nav-btn"
                                onClick={() => {
                                    handleLoginClick();
                                    setIsMenuOpen(false);
                                }}
                            >
                                <i className="fas fa-sign-in-alt"></i> Iniciar sesión
                            </button>
                        )}

                        {/* Separador visual */}
                        <hr style={{ margin: '1rem 0', opacity: 0.3 }} />

                        {/* Enlaces adicionales en el menú móvil */}
                        <a
                            className="mobile-nav-btn"
                            href="/PublicHomePage"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <i className="fas fa-home me-1"></i> Inicio
                        </a>
                        <a
                            className="mobile-nav-btn"
                            href="/PublicHomePage#noticias"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <i className="fas fa-newspaper me-1"></i> Noticias
                        </a>
                        <a
                            className="mobile-nav-btn"
                            href="/ContactPage"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <i className="fas fa-envelope me-1"></i> Contacto
                        </a>
                    </div>
                </div>
            )}

            {/* Sección hero con carrusel de imágenes */}
            <div className="hero-section">
                <div className="hero-container">
                    {/* Texto principal del hero */}
                    <div className="hero-content">
                        <h1 className="title-gradient-blue">NewsPhere</h1>
                        <p className="hero-subtitle fuenteV">Tu portal de noticias corporativas más confiable</p>
                        <p className="hero-description">
                            Mantente informado con las últimas noticias de tu empresa.
                            Actualizaciones en tiempo real, reportes exclusivos y
                            análisis profundos de los eventos más relevantes.
                        </p>
                    </div>

                    {/* Carrusel funcional controlado por estado */}
                    <div className="hero-carousel">
                        <div className="carousel-container">
                            {carouselImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`carousel-slide ${index === activeIndex ? 'active' : ''}`}
                                    style={{
                                        backgroundImage: `url(${image})`,
                                        opacity: index === activeIndex ? 1 : 0,
                                        transition: 'opacity 1s ease-in-out',
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Exportación del componente Header
export default Header;
