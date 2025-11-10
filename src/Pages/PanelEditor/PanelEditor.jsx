import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Componentes/Context/AuthContext.jsx';
import { newsService } from '../../Servicios/newsService.js';
import './PanelEditor.css';

const PanelEditor = () => {
    const { currentUser, userRole } = useAuth();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        if (currentUser) {
            loadNews();
        }
    }, [currentUser]);

    const loadNews = async () => {
        try {
            setLoading(true);
            const allNews = await newsService.getNewsByUser(currentUser.uid, userRole);
            setNews(allNews);
        } catch (error) {
            console.error('❌ Error cargando noticias:', error);
            setError('Error al cargar las noticias: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (newsId, newStatus) => {
        try {
            await newsService.changeNewsStatus(newsId, newStatus);
            await loadNews();
        } catch (error) {
            setError('Error al cambiar el estado: ' + error.message);
        }
    };

    const handleDelete = async (newsId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
            try {
                await newsService.deleteNews(newsId);
                await loadNews();
            } catch (error) {
                setError('Error al eliminar la noticia: ' + error.message);
            }
        }
    };

    const filteredNews = news.filter(noticia => {
        if (filter === 'pending') return noticia.estado === 'Terminado';
        if (filter === 'published') return noticia.estado === 'Publicado';
        if (filter === 'edition') return noticia.estado === 'Edición';
        if (filter === 'disabled') return noticia.estado === 'Desactivado';
        return true;
    });

    if (loading) {
        return (
            <div className="panel-editor-container">
                <div className="loading-container">
                    <div className="glass-spinner"></div>
                    <p className="loading-text">Cargando noticias...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="panel-editor-container">
            <div className="editor-header">
                <div className="header-content">
                    <h1 className="title-gradient-blue">Panel del Editor</h1>
                    <p className="editor-subtitle">Gestiona y revisa todas las noticias</p>
                </div>
            </div>

            {error && (
                <div className="error-message">
                    <i className="fas fa-exclamation-triangle"></i>
                    <span>{error}</span>
                    <button onClick={() => setError('')} className="error-close">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            )}

            {/* Estadísticas */}
            <div className="stats-grid">
                <div className="stat-card glass-card">
                    <div className="stat-icon total">
                        <i className="fas fa-newspaper"></i>
                    </div>
                    <div className="stat-content">
                        <h3>{news.length}</h3>
                        <p>Total Noticias</p>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-icon edition">
                        <i className="fas fa-edit"></i>
                    </div>
                    <div className="stat-content">
                        <h3>{news.filter(n => n.estado === 'Edición').length}</h3>
                        <p>En Edición</p>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-icon review">
                        <i className="fas fa-clock"></i>
                    </div>
                    <div className="stat-content">
                        <h3>{news.filter(n => n.estado === 'Terminado').length}</h3>
                        <p>Pendientes</p>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-icon published">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="stat-content">
                        <h3>{news.filter(n => n.estado === 'Publicado').length}</h3>
                        <p>Publicadas</p>
                    </div>
                </div>
            </div>

            {/* Filtros */}
            <div className="filters-section glass-card">
                <h3 className="filters-title">Filtrar Noticias</h3>
                <div className="filters-grid">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        <i className="fas fa-layer-group"></i>
                        Todas ({news.length})
                    </button>
                    <button
                        className={`filter-btn ${filter === 'edition' ? 'active' : ''}`}
                        onClick={() => setFilter('edition')}
                    >
                        <i className="fas fa-edit"></i>
                        En Edición ({news.filter(n => n.estado === 'Edición').length})
                    </button>
                    <button
                        className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                        onClick={() => setFilter('pending')}
                    >
                        <i className="fas fa-clock"></i>
                        Pendientes ({news.filter(n => n.estado === 'Terminado').length})
                    </button>
                    <button
                        className={`filter-btn ${filter === 'published' ? 'active' : ''}`}
                        onClick={() => setFilter('published')}
                    >
                        <i className="fas fa-check-circle"></i>
                        Publicadas ({news.filter(n => n.estado === 'Publicado').length})
                    </button>
                </div>
            </div>

            {/* Lista de Noticias */}
            <div className="news-section">
                <div className="section-header">
                    <h2 className="section-title">
                        {filter === 'all' && 'Todas las Noticias'}
                        {filter === 'pending' && 'Noticias Pendientes de Revisión'}
                        {filter === 'published' && 'Noticias Publicadas'}
                        {filter === 'edition' && 'Noticias en Edición'}
                        <span className="news-count">{filteredNews.length}</span>
                    </h2>
                </div>

                {filteredNews.length === 0 ? (
                    <div className="empty-state glass-card">
                        <i className="fas fa-inbox"></i>
                        <h3>No hay noticias</h3>
                        <p>
                            {filter === 'pending'
                                ? 'No hay noticias pendientes de revisión'
                                : 'No hay noticias para mostrar con este filtro'
                            }
                        </p>
                    </div>
                ) : (
                    <div className="news-grid">
                        {filteredNews.map((noticia) => (
                            <NewsCard
                                key={noticia.id}
                                noticia={noticia}
                                onStatusChange={handleStatusChange}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Componente de Tarjeta de Noticia Mejorado
const NewsCard = ({ noticia, onStatusChange, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getStatusColor = (estado) => {
        switch (estado) {
            case 'Publicado': return 'status-published';
            case 'Terminado': return 'status-pending';
            case 'Edición': return 'status-edition';
            case 'Desactivado': return 'status-disabled';
            default: return 'status-default';
        }
    };

    const getStatusIcon = (estado) => {
        switch (estado) {
            case 'Publicado': return 'fas fa-check-circle';
            case 'Terminado': return 'fas fa-clock';
            case 'Edición': return 'fas fa-edit';
            case 'Desactivado': return 'fas fa-pause-circle';
            default: return 'fas fa-circle';
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className={`news-card glass-card ${getStatusColor(noticia.estado)}`}>
            {/* Header de la tarjeta */}
            <div className="news-card-header">
                <div className="news-status">
                    <i className={getStatusIcon(noticia.estado)}></i>
                    <span>{noticia.estado}</span>
                </div>
                <div className="news-category">
                    <span className="category-badge">{noticia.categoria}</span>
                </div>
            </div>

            {/* Imagen */}
            {noticia.imagen && (
                <div className="news-image">
                    <img src={noticia.imagen} alt={noticia.titulo} />
                </div>
            )}

            {/* Contenido */}
            <div className="news-content">
                <h3 className="news-title">{noticia.titulo}</h3>
                {noticia.subtitulo && (
                    <p className="news-subtitle">{noticia.subtitulo}</p>
                )}
                
                {isExpanded && (
                    <div className="news-expanded">
                        <p className="news-full-content">{noticia.contenido}</p>
                    </div>
                )}

                <div className="news-meta">
                    <div className="meta-item">
                        <i className="fas fa-user"></i>
                        <span>{noticia.autorEmail}</span>
                    </div>
                    <div className="meta-item">
                        <i className="fas fa-calendar"></i>
                        <span>{formatDate(noticia.fechaCreacion)}</span>
                    </div>
                </div>
            </div>

            {/* Acciones */}
            <div className="news-actions">
                <button
                    className="action-btn expand"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <i className={`fas fa-${isExpanded ? 'compress' : 'expand'}`}></i>
                    {isExpanded ? 'Contraer' : 'Expandir'}
                </button>

                {noticia.estado === 'Terminado' && (
                    <button
                        className="action-btn publish"
                        onClick={() => onStatusChange(noticia.id, 'Publicado')}
                    >
                        <i className="fas fa-check"></i>
                        Publicar
                    </button>
                )}

                {noticia.estado === 'Publicado' && (
                    <button
                        className="action-btn disable"
                        onClick={() => onStatusChange(noticia.id, 'Desactivado')}
                    >
                        <i className="fas fa-pause"></i>
                        Desactivar
                    </button>
                )}

                {noticia.estado === 'Desactivado' && (
                    <button
                        className="action-btn publish"
                        onClick={() => onStatusChange(noticia.id, 'Publicado')}
                    >
                        <i className="fas fa-play"></i>
                        Reactivar
                    </button>
                )}

                <button
                    className="action-btn delete"
                    onClick={() => onDelete(noticia.id)}
                >
                    <i className="fas fa-trash"></i>
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default PanelEditor;