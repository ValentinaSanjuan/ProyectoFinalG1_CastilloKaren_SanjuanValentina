import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Componentes/Context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { newsService } from '../../Servicios/newsService';

const NewsFormPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        titulo: '',
        subtitulo: '',
        contenido: '',
        categoria: '',
        imagen: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Categorías predefinidas
    const categories = ['Tecnología', 'Deportes', 'Política', 'Cultura', 'Economía', 'Salud', 'Educación'];

    // Cargar datos si es edición
    useEffect(() => {
        console.log('[DEBUG] NewsFormPage montado, ID:', id);
        console.log('[DEBUG] currentUser:', currentUser);

        if (id) {
            loadNewsData();
        }
    }, [id]);

    const loadNewsData = async () => {
        try {
            console.log('[DEBUG] Cargando datos de noticia con ID:', id);
            const news = await newsService.getNewsById(id);
            console.log('[DEBUG] Noticia cargada:', news);

            if (news) {
                setFormData({
                    titulo: news.titulo || '',
                    subtitulo: news.subtitulo || '',
                    contenido: news.contenido || '',
                    categoria: news.categoria || '',
                    imagen: news.imagen || ''
                });
                console.log('[DEBUG] FormData actualizado:', formData);
            }
        } catch (error) {
            console.error(' [DEBUG] Error cargando noticia:', error);
            setError('Error al cargar la noticia: ' + error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        console.log(' [DEBUG] === INICIANDO SUBMIT ===');
        console.log(' [DEBUG] Datos del formulario:', formData);
        console.log(' [DEBUG] Usuario actual:', currentUser);
        console.log(' [DEBUG] newsService disponible:', !!newsService);

        if (newsService) {
            console.log('[DEBUG] createNews disponible:', typeof newsService.createNews);
            console.log('[DEBUG] updateNews disponible:', typeof newsService.updateNews);
        }

        // Validación básica
        if (!formData.titulo.trim() || !formData.contenido.trim() || !formData.categoria.trim()) {
            console.log(' [DEBUG] Validación fallida - campos vacíos');
            setError('Por favor completa todos los campos obligatorios');
            setLoading(false);
            return;
        }

        console.log(' [DEBUG] Validación pasada');

        try {
            const newsData = {
                titulo: formData.titulo,
                subtitulo: formData.subtitulo,
                contenido: formData.contenido,
                categoria: formData.categoria,
                imagen: formData.imagen,
                autor: currentUser.uid,
                autorEmail: currentUser.email
            };

            console.log('[DEBUG] Datos a enviar a Firebase:', newsData);

            if (id) {
                console.log('[DEBUG] Editando noticia existente:', id);
                await newsService.updateNews(id, newsData);
                console.log(' [DEBUG] Noticia actualizada exitosamente');
            } else {
                console.log('[DEBUG] Creando nueva noticia');
                await newsService.createNews(newsData);
                console.log(' [DEBUG] Noticia creada exitosamente');
            }

            console.log(' [DEBUG] Operación completada, navegando a dashboard');
            navigate('/dashboard');

        } catch (error) {
            console.error(' [DEBUG] Error completo:', error);
            console.error(' [DEBUG] Mensaje de error:', error.message);
            console.error(' [DEBUG] Stack trace:', error.stack);
            setError('Error al guardar la noticia: ' + error.message);
        }

        setLoading(false);
        console.log('🔍 [DEBUG] === FINALIZANDO SUBMIT ===');
    };

    return (
        <div className="container-fluid py-5 bg-light min-vh-100">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10 col-xl-8">
                    <div className="card shadow-lg border-0">
                        {/* Header con gradiente */}
                        <div className="card-header bg-primary text-white py-4">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h1 className="h2 mb-2">
                                        <i className="fas fa-newspaper me-3"></i>
                                        {id ? 'Editar Noticia' : 'Crear Nueva Noticia'}
                                    </h1>
                                    <p className="mb-0 opacity-90">
                                        {id ? 'Modifica los detalles de tu noticia' : 'Completa el formulario para publicar una nueva noticia'}
                                    </p>
                                </div>
                                <div className="col-auto">
                                    <span className="badge bg-light text-primary fs-6">
                                        ID: {id || 'Nueva'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Body del formulario */}
                        <div className="card-body p-4 p-md-5">
                            {error && (
                                <div className="alert alert-danger d-flex align-items-center">
                                    <i className="fas fa-exclamation-triangle me-3 fs-5"></i>
                                    <div>
                                        <strong>Error:</strong> {error}
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* Título */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold fs-5">
                                        Título <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg border-2"
                                        name="titulo"
                                        value={formData.titulo}
                                        onChange={handleChange}
                                        required
                                        placeholder="Ingresa el título de la noticia"
                                    />
                                </div>

                                {/* Subtítulo */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold fs-5">Subtítulo</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg border-2"
                                        name="subtitulo"
                                        value={formData.subtitulo}
                                        onChange={handleChange}
                                        placeholder="Ingresa un subtítulo opcional"
                                    />
                                </div>

                                {/* Categoría */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold fs-5">
                                        Categoría <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className="form-select form-select-lg border-2"
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Imagen */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold fs-5">URL de la Imagen</label>
                                    <input
                                        type="url"
                                        className="form-control form-control-lg border-2"
                                        name="imagen"
                                        value={formData.imagen}
                                        onChange={handleChange}
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                    />
                                    <div className="form-text text-muted mt-2">
                                        <i className="fas fa-info-circle me-2"></i>
                                        Ingresa la URL de una imagen para tu noticia
                                    </div>

                                    {/* Vista previa de la imagen */}
                                    {formData.imagen && (
                                        <div className="mt-3">
                                            <p className="text-muted mb-2 fw-semibold">
                                                <i className="fas fa-eye me-2"></i>
                                                Vista previa:
                                            </p>
                                            <div className="text-center">
                                                <img
                                                    src={formData.imagen}
                                                    alt="Preview"
                                                    className="img-fluid rounded shadow-sm"
                                                    style={{
                                                        maxHeight: '250px',
                                                        maxWidth: '100%',
                                                        objectFit: 'cover'
                                                    }}
                                                    onError={(e) => {
                                                        console.log('[DEBUG] Error cargando imagen preview');
                                                        e.target.style.display = 'none';
                                                    }}
                                                    onLoad={() => console.log(' [DEBUG] Imagen preview cargada')}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Contenido */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold fs-5">
                                        Contenido <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        className="form-control border-2"
                                        name="contenido"
                                        rows="12"
                                        value={formData.contenido}
                                        onChange={handleChange}
                                        required
                                        placeholder="Escribe el contenido de tu noticia aquí..."
                                        style={{
                                            fontSize: '1.1rem',
                                            lineHeight: '1.6'
                                        }}
                                    ></textarea>
                                </div>

                                {/* Botones de acción */}
                                <div className="d-flex gap-3 justify-content-center pt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg px-5"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                Guardando...
                                            </>
                                        ) : (
                                            <>
                                                <i className={`fas ${id ? 'fa-save' : 'fa-plus'} me-2`}></i>
                                                {id ? 'Actualizar Noticia' : 'Crear Noticia'}
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-lg px-5"
                                        onClick={() => {
                                            console.log(' [DEBUG] Cancelando, navegando a dashboard');
                                            navigate('/dashboard');
                                        }}
                                        disabled={loading}
                                    >
                                        <i className="fas fa-times me-2"></i>
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Footer informativo */}
                        <div className="card-footer bg-light py-3">
                            <div className="text-center text-muted">
                                <small>
                                    <i className="fas fa-info-circle me-2"></i>
                                    Los campos marcados con <span className="text-danger">*</span> son obligatorios
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsFormPage;