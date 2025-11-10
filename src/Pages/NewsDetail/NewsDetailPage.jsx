import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { newsService } from "../../Servicios/newsService.js";
import './NewsDetailPage.css';

const NewsDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [noticia, setNoticia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadNewsDetail = async () => {
            try {
                setLoading(true);
                setError("");

                const newsData = await newsService.getNewsById(id);

                if (!newsData) {
                    setError("Noticia no encontrada");
                    return;
                }

                if (newsData.estado !== "Publicado") {
                    setError("Esta noticia no está disponible");
                    return;
                }

                const formatDate = (date) =>
                    date instanceof Date ? date : new Date(date);

                setNoticia({
                    ...newsData,
                    fechaCreacion: formatDate(newsData.fechaCreacion),
                    fechaActualizacion: formatDate(newsData.fechaActualizacion),
                });
            } catch (err) {
                setError("Error al cargar la noticia: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        loadNewsDetail();
    }, [id]);

    // LOADING
    if (loading) {
        return (
            <div className="news-detail-loading">
                <div className="liquid-loader">
                    <div className="liquid-bubble"></div>
                    <div className="liquid-bubble"></div>
                    <div className="liquid-bubble"></div>
                </div>
                <p className="loading-text">Cargando noticia...</p>
            </div>
        );
    }

    // ERROR
    if (error) {
        return (
            <div className="news-detail-error">
                <div className="error-container liquid-glass">
                    <div className="error-icon">
                        <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <h2>Error al cargar</h2>
                    <p>{error}</p>
                    <Link to="/" className="liquid-btn primary">
                        <i className="fas fa-home"></i>
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    if (!noticia) {
        return (
            <div className="news-detail-error">
                <div className="error-container liquid-glass">
                    <div className="error-icon">
                        <i className="fas fa-newspaper"></i>
                    </div>
                    <h2>Noticia no encontrada</h2>
                    <p>La noticia solicitada no existe o no está disponible.</p>
                    <Link to="/" className="liquid-btn primary">
                        <i className="fas fa-home"></i>
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="news-detail-container">
            {/* Fondo líquido animado */}
            <div className="liquid-background">
                <div className="liquid-shape shape-1"></div>
                <div className="liquid-shape shape-2"></div>
                <div className="liquid-shape shape-3"></div>
            </div>

            <div className="news-detail-content">
                {/* Breadcrumb elegante */}
                <nav className="liquid-breadcrumb">
                    <Link to="/" className="breadcrumb-item">
                        <i className="fas fa-home"></i>
                        Inicio
                    </Link>
                    <span className="breadcrumb-divider">/</span>
                    <Link to="/PublicHomePage" className="breadcrumb-item">
                        Noticias
                    </Link>
                    <span className="breadcrumb-divider">/</span>
                    <span className="breadcrumb-current">{noticia.categoria}</span>
                </nav>

                {/* Tarjeta principal con efecto Liquid Glass */}
                <article className="news-detail-card liquid-glass">
                    {/* Header */}
                    <header className="news-detail-header">
                        <div className="category-badge liquid-badge">
                            <i className="fas fa-tag"></i>
                            {noticia.categoria}
                        </div>

                        <h1 className="news-detail-title">{noticia.titulo}</h1>

                        {noticia.subtitulo && (
                            <h2 className="news-detail-subtitle">
                                {noticia.subtitulo}
                            </h2>
                        )}

                        <div className="news-meta-grid">
                            <div className="meta-item">
                                <div className="meta-icon">
                                    <i className="fas fa-user-circle"></i>
                                </div>
                                <div className="meta-content">
                                    <span className="meta-label">Autor</span>
                                    <span className="meta-value">{noticia.autorEmail}</span>
                                </div>
                            </div>

                            <div className="meta-item">
                                <div className="meta-icon">
                                    <i className="fas fa-calendar-alt"></i>
                                </div>
                                <div className="meta-content">
                                    <span className="meta-label">Publicado</span>
                                    <span className="meta-value">
                                        {noticia.fechaCreacion.toLocaleDateString("es-ES", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>

                            {noticia.fechaActualizacion.getTime() !== noticia.fechaCreacion.getTime() && (
                                <div className="meta-item">
                                    <div className="meta-icon">
                                        <i className="fas fa-edit"></i>
                                    </div>
                                    <div className="meta-content">
                                        <span className="meta-label">Actualizado</span>
                                        <span className="meta-value">
                                            {noticia.fechaActualizacion.toLocaleDateString("es-ES")}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Imagen principal */}
                    {noticia.imagen && (
                        <div className="news-image-wrapper">
                            <div className="image-container liquid-glass">
                                <img 
                                    src={noticia.imagen} 
                                    alt={noticia.titulo}
                                    className="news-detail-image"
                                />
                            </div>
                        </div>
                    )}

                    {/* Contenido */}
                    <section className="news-content-section">
                        <div className="content-wrapper">
                            <p className="news-content-text">
                                {noticia.contenido}
                            </p>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="news-detail-footera">
                        <div className="footer-action">
                            <button 
                                onClick={() => window.print()} 
                                className="nav-btn secondary"
                            >
                                <i className="fas fa-print"></i>
                                Imprimir
                            </button>
                            <button 
                                onClick={() => navigate(-1)} 
                                className="nav-btn primary"
                            >
                                <i className="fas fa-arrow-left"></i>
                                Volver
                            </button>
                        </div>
                    </footer>
                </article>
            </div>
        </div>
    );
};

export default NewsDetailPage;