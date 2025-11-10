// Importa las dependencias necesarias desde React y React Router DOM
import React from 'react';
import { Link } from 'react-router-dom';

// Importa los estilos CSS específicos para el componente Footer
import './Footer.css';

// Importa el logotipo que se mostrará en el pie de página
import logo2 from '../../assets/img2.png';

// Componente funcional Footer: representa el pie de página del sitio web
const Footer = () => {
    // Obtiene el año actual dinámicamente para mostrarlo en el footer
    const currentYear = new Date().getFullYear();

    return (
        // Estructura principal del footer con clases y id para estilos CSS
        <footer id="FooterPrincipal" className="footer-elegant">
            <div className="footer-container">
                
                {/* --- PARTE SUPERIOR --- */}
                {/* Contiene el logotipo, nombre del sitio, descripción y enlaces de navegación */}
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            {/* Imagen del logotipo y nombre del sitio */}
                            <img src={logo2} alt="NotiSphere" className="header-logo" />
                            <span>Newsphere</span>
                        </div>
                        {/* Descripción breve del sitio */}
                        <p className="footer-description">
                            Tu fuente confiable de noticias actualizadas, con estilo, precisión y elegancia.
                        </p>
                    </div>

                    {/* Enlaces rápidos hacia otras secciones del sitio */}
                    <div className="footer-links">
                        <Link to="/" className="footer-link">Inicio</Link>
                        <Link to="/login" className="footer-link">Administración</Link>
                    </div>
                </div>

                {/* Línea divisoria visual entre secciones del footer */}
                <div className="footer-divider"></div>

                {/* --- REDES SOCIALES --- */}
                {/* Enlaces a las redes sociales con íconos de FontAwesome */}
                <div className="footer-socials">
                    <a href="https://www.facebook.com/login" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.instagram.com/accounts/login" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://twitter.com/i/flow/login" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.linkedin.com/login" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>

                {/* Línea divisoria inferior */}
                <div className="footer-divider"></div>

                {/* --- PARTE INFERIOR --- */}
                {/* Sección final con derechos de autor y créditos de diseño */}
                <div className="footer-bottom">
                    {/* Muestra el año actual automáticamente */}
                    <p>&copy; {currentYear} NotiSphere. Todos los derechos reservados.</p>
                    <p className="footer-credits">
                        Diseñado con mucho LOVE por <strong>Karen Sophya Castillo</strong> y <strong>Valentina Sanjuan Ramos</strong>
                    </p>
                </div>
            </div>
        </footer>
    );
};

// Exporta el componente para que pueda ser utilizado en otros archivos
export default Footer;
