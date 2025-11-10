import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { newsService } from '../../Servicios/newsService.js';

const PublicHomePage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [featuredNews, setFeaturedNews] = useState(null);
    const location = useLocation();

    useEffect(() => {
        loadPublicNews();
    }, []);

    useEffect(() => {
        // Leer categoría desde parámetros URL
        const urlParams = new URLSearchParams(location.search);
        const categoryFromUrl = urlParams.get('category');
        
        if (categoryFromUrl && news.length > 0) {
            const categories = ['Todas', ...new Set(news.map(item => item.categoria))];
            if (categories.includes(categoryFromUrl)) {
                setSelectedCategory(categoryFromUrl);
            }
        }
    }, [location.search, news]);

    const loadPublicNews = async () => {
        try {
            setLoading(true);
            const publicNews = await newsService.getPublicNews();

            console.log('📰 Noticias cargadas:', publicNews.length);
            publicNews.forEach((noticia, index) => {
                console.log(`Noticia ${index + 1}:`, {
                    titulo: noticia.titulo,
                    categoria: noticia.categoria,
                    imagen: noticia.imagen ? '✅' : '❌'
                });
            });

            setNews(publicNews);
            
            // Establecer noticia destacada (la más reciente)
            if (publicNews.length > 0) {
                setFeaturedNews(publicNews[0]);
            }
        } catch (error) {
            console.error('Error loading news:', error);
        } finally {
            setLoading(false);
        }
    };

    // Obtener categorías únicas
    const categories = ['Todas', ...new Set(news.map(item => item.categoria))];

    // Filtrar noticias por categoría
    const filteredNews = selectedCategory === 'Todas' 
        ? news 
        : news.filter(item => item.categoria === selectedCategory);

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <div className="loading-spinner mb-3"></div>
                    <p className="text-muted">Cargando las últimas noticias...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="public-home">
            

            {/* Category Filters - Estilo Moderno */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="title-gradient-b">Explora por Categoría</h2>
                        <p className="text-muted fs-5">Descubre noticias de tu interés</p>
                    </div>
                    
                        <div className="category-filters">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category} 
                                    {category !== 'Todas' && (
                                        <span className="ms-2 badge bg-white text-dark">
                                            {news.filter(n => n.categoria === category).length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
            </section>

            {/* News Grid */}
            <section id= "noticias" className="py-5 noticias-section section-blue">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="title-gradient-b">
                            {selectedCategory === 'Todas' ? 'Todas las Noticias' : `Noticias de ${selectedCategory}`}
                        </h2>
                        <p className="text-muted">
                            Mostrando {filteredNews.length} noticia{filteredNews.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {filteredNews.length > 0 ? (
                        <div className="news-grid">
                            {filteredNews.map((noticia, index) => (
                                <article key={noticia.id} className="news-article fade-in-up" 
                                    style={{ animationDelay: `${index * 0.1}s` }}>
                                    
                                    {/* Imagen de la noticia */}
                                    {noticia.imagen && (
                                        <div className="news-image-container" style={{ overflow: 'hidden' }}>
                                            <img
                                                src={noticia.imagen}
                                                alt={noticia.titulo}
                                                className="news-image"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextElementSibling.style.display = 'flex';
                                                }}
                                            />
                                            
                                        </div>
                                    )}
                                    
                                    {/* Contenido de la noticia */}
                                    <div className="news-content">
                                        <span className="news-category">
                                            {noticia.categoria}
                                        </span>
                                        
                                        <h3 className="news-title">
                                            {noticia.titulo}
                                        </h3>
                                        
                                        {noticia.subtitulo && (
                                            <p className="news-subtitle">
                                                {noticia.subtitulo}
                                            </p>
                                        )}
                                        
                                        <p className="news-excerpt">
                                            {noticia.contenido?.substring(0, 120)}...
                                        </p>
                                        
                                        <div className="news-meta">
                                            <div>
                                                <small className="text-muted">
                                                    Por {noticia.autorEmail} • {' '}
                                                    {noticia.fechaCreacion?.toLocaleDateString('es-ES', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </small>
                                            </div>
                                            <Link
                                                to={`/noticia/${noticia.id}`}
                                                className="read-more"
                                            >
                                                Leer más
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-5">
                            <div className="glass-card p-5 d-inline-block">
                                <i className="fas fa-inbox fa-4x text-muted mb-4"></i>
                                <h4 className="mb-3">No hay noticias disponibles</h4>
                                <p className="text-muted mb-0">
                                    {selectedCategory === 'Todas'
                                        ? 'No hay noticias publicadas en este momento.'
                                        : `No hay noticias en la categoría ${selectedCategory}.`
                                    }
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default PublicHomePage;