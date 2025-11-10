import React, { useState } from 'react';
import { useAuth } from '../../Componentes/Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../Login/AuthPages.css'; // CSS compartido para ambos formularios

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'reportero'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return setError('Las contraseñas no coinciden');
        }

        if (formData.password.length < 6) {
            return setError('La contraseña debe tener al menos 6 caracteres');
        }

        try {
            setError('');
            setLoading(true);
            await register(formData.email, formData.password, formData.role);
            navigate('/dashboard');
        } catch (error) {
            setError('Error al crear la cuenta: ' + error.message);
        }

        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-background">
                <div className="auth-glass-effect"></div>
            </div>
            
            <div className="auth-content">
                <div className="auth-card glass-card">
                    {/* Header */}
                    <div className="auth-header">
                        <div className="auth-logo">
                            <i className="fas fa-newspaper"></i>
                            <span>NotiSphere</span>
                        </div>
                        <h1 className="auth-title">Crear Cuenta</h1>
                        <p className="auth-subtitle">Únete a nuestra plataforma de noticias</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="auth-error">
                            <i className="fas fa-exclamation-circle"></i>
                            <span>{error}</span>
                            <button onClick={() => setError('')} className="error-close">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                <i className="fas fa-envelope"></i>
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="tu@email.com"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role" className="form-label">
                                <i className="fas fa-user-tag"></i>
                                Rol
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="form-select"
                            >
                                <option value="reportero">Reportero</option>
                                <option value="editor">Editor</option>
                            </select>
                            <div className="form-hint">
                                <i className="fas fa-info-circle"></i>
                                Los editores pueden publicar noticias, los reporteros solo pueden crearlas y editarlas.
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                <i className="fas fa-lock"></i>
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Mínimo 6 caracteres"
                                minLength="6"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">
                                <i className="fas fa-lock"></i>
                                Confirmar Contraseña
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Repite tu contraseña"
                                className="form-input"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`auth-button ${loading ? 'loading' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <div className="button-spinner"></div>
                                    Creando cuenta...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-user-plus"></i>
                                    Crear Cuenta
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="auth-footer">
                        <p>
                            ¿Ya tienes cuenta?{' '}
                            <Link to="/login" className="auth-link">
                                Inicia sesión aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;