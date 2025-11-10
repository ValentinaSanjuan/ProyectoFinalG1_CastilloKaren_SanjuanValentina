import React from 'react';
import { Link } from 'react-router-dom';

const NewsList = ({ news, userRole, onStatusChange, onDelete, showOnlyPublished = false }) => {

    const getStatusBadge = (estado) => {
        const statusConfig = {
            'Edición': 'bg-warning text-dark',
            'Terminado': 'bg-info text-white',
            'Publicado': 'bg-success text-white',
            'Desactivado': 'bg-secondary text-white'
        };
        return statusConfig[estado] || 'bg-secondary text-white';
    };

    const handleImageError = (e) => {
        e.target.style.display = 'none';
    };

    const handleImageLoad = () => { };

    // FILTRADO OPCIONAL
    const listaFiltrada = showOnlyPublished
        ? news.filter(n => n.estado === "Publicado")
        : news;

    return (
        <div className="news-list">
            {listaFiltrada.length === 0 ? (
                <div className="text-center py-4">
                    <p className="text-muted">No hay noticias para mostrar</p>
                </div>
            ) : (
                listaFiltrada.map(noticia => (
                    <div key={noticia.id} className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <h5 className="card-title">{noticia.titulo}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        {noticia.subtitulo}
                                    </h6>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Categoría: {noticia.categoria} |
                                            Autor: {noticia.autorEmail} |
                                            Creado: {noticia.fechaCreacion?.toLocaleDateString()}
                                        </small>
                                    </p>
                                </div>

                                <div className="col-md-4 text-end">

                                    {/* AQUÍ ESTABA EL ERROR */}
                                    <span className={`badge ${getStatusBadge(noticia.estado)} mb-2`}>
                                        {noticia.estado}
                                    </span>

                                    {/* BOTONES DE ACCIÓN PARA EDITOR */}
                                    {userRole === 'editor' && (
                                        <div className="editor-actions mb-2">
                                            {/* Noticia en estado TERMINADO (pendiente de revisión) */}
                                            {noticia.estado === 'Terminado' && (
                                                <div className="btn-group w-100" role="group">
                                                    <button
                                                        onClick={() => onStatusChange(noticia.id, 'Publicado')}
                                                        className="btn btn-success btn-sm"
                                                    >
                                                         Publicar
                                                    </button>
                                                    <button
                                                        onClick={() => onStatusChange(noticia.id, 'Edición')}
                                                        className="btn btn-warning btn-sm"
                                                    >
                                                        Devolver
                                                    </button>
                                                </div>
                                            )}

                                            {/* Noticia en estado PUBLICADO */}
                                            {noticia.estado === 'Publicado' && (
                                                <button
                                                    onClick={() => onStatusChange(noticia.id, 'Desactivado')}
                                                    className="btn btn-secondary btn-sm w-100"
                                                >
                                                     Desactivar
                                                </button>
                                            )}

                                            {/* Noticia en estado DESACTIVADO */}
                                            {noticia.estado === 'Desactivado' && (
                                                <button
                                                    onClick={() => onStatusChange(noticia.id, 'Publicado')}
                                                    className="btn btn-success btn-sm w-100"
                                                >
                                                    Reactivar
                                                </button>
                                            )}

                                            {/* Noticia en estado EDICIÓN (editor puede publicar directamente) */}
                                            {noticia.estado === 'Edición' && (
                                                <button
                                                    onClick={() => onStatusChange(noticia.id, 'Publicado')}
                                                    className="btn btn-success btn-sm w-100"
                                                >
                                                     Publicar Directamente
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {/* BOTONES PARA REPORTERO */}
                                    {userRole === 'reportero' && (
                                        <div className="reporter-actions mb-2">
                                            {noticia.estado === 'Edición' && (
                                                <button
                                                    onClick={() => onStatusChange(noticia.id, 'Terminado')}
                                                    className="btn btn-success btn-sm w-100"
                                                >
                                                     Enviar a Revisión
                                                </button>
                                            )}

                                            {noticia.estado === 'Terminado' && (
                                                <button
                                                    onClick={() => onStatusChange(noticia.id, 'Edición')}
                                                    className="btn btn-warning btn-sm w-100"
                                                >
                                                     Volver a Edición
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {/* BOTONES DE EDICIÓN Y ELIMINACIÓN */}
                                    <div className="btn-group mb-2" role="group">
                                        {/* Cualquier usuario puede editar noticias en estado "Edición" */}
                                        {(noticia.estado === 'Edición' || userRole === 'editor') && (
                                            <Link
                                                to={`/edit-news/${noticia.id}`}
                                                className="btn btn-outline-primary btn-sm"
                                            >
                                                 Editar
                                            </Link>
                                        )}

                                        {/* Solo editores pueden eliminar */}
                                        {userRole === 'editor' && (
                                            <button
                                                onClick={() => onDelete(noticia.id)}
                                                className="btn btn-outline-danger btn-sm"
                                            >
                                                Eliminar
                                            </button>
                                        )}
                                    </div>

                                    {/* SECCIÓN DE IMAGEN - CORREGIDO */}
                                    <div className="mt-2">
                                        {noticia.imagen ? (
                                            <div className="image-container">
                                                <img
                                                    src={noticia.imagen}
                                                    alt={`Imagen de ${noticia.titulo}`}
                                                    className="img-thumbnail"
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        objectFit: 'cover'
                                                    }}
                                                    onError={handleImageError}
                                                    onLoad={handleImageLoad}
                                                />
                                                <small className="text-muted d-block mt-1">Imagen</small>
                                            </div>
                                        ) : (
                                            <div className="image-placeholder">
                                                <div className="img-thumbnail d-flex align-items-center justify-content-center bg-light"
                                                    style={{
                                                        width: '100px',
                                                        height: '100px'
                                                    }}>
                                                    <i className="fas fa-image text-muted"></i>
                                                </div>
                                                <small className="text-muted d-block">Sin imagen</small>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default NewsList;