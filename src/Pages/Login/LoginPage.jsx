import React, { useState } from 'react';
import { useAuth } from '../../Componentes/Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './AuthPages.css'; // CSS compartido para ambos formularios

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            setError('Error al iniciar sesión: ' + error.message);
        }

        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div id= "loginP" className="auth-background">
                
            </div>
            
            <div className="auth-content">
                <div className="auth-card glass-card">
                    {/* Header */}
                    <div className="auth-header">
                        <div className="auth-logo">
                            <i className="fas fa-newspaper"></i>
                            <span>NotiSphere</span>
                        </div>
                        <h1 className="auth-title">Bienvenido de nuevo</h1>
                        <p className="auth-subtitle">Ingresa a tu cuenta para continuar</p>
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="tu@email.com"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                <i className="fas fa-lock"></i>
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
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
                                    Iniciando sesión...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-sign-in-alt"></i>
                                    Iniciar Sesión
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="auth-footer">
                        <p>
                            ¿No tienes cuenta?{' '}
                            <Link to="/register" className="auth-link">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;