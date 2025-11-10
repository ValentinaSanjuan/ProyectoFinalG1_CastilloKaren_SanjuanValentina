import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../Componentes/Context/AuthContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginPage from '../../Pages/Login/LoginPage';
import RegisterPage from '../../Pages/Register/RegisterPage';
import DashboardPage from '../../Pages/Dashboard/DashboardPage';
import PanelReportero from '../../Pages/PanelReportero/PanelReportero';
import PanelEditor from '../../Pages/PanelEditor/PanelEditor';
import NotFoundPage from '../../Pages/NotFound/NotFoundPage';
import UnauthorizedPage from '../../Pages/Unauthorized/UnauthorizedPage';
import NewsFormPage from '../../Pages/NewsForm/NewsFormPage';
import PublicHomePage from '../../Pages/PublicHome/PublicHomePage';
import NewsDetailPage from '../../Pages/NewsDetail/NewsDetailPage';
import ContactPage from '../../Pages/Contact/ContactPage';

const Main = () => {
    const { userRole } = useAuth();

    const renderDashboard = () => {
        if (userRole === 'editor') {
            return <PanelEditor />;
        } else if (userRole === 'reportero') {
            return <PanelReportero />;
        }
        return (
            <div className="container mt-4">
                <div className="alert alert-warning">
                    <h4>Rol no asignado</h4>
                    <p>No tienes un rol asignado. Contacta al administrador.</p>
                </div>
            </div>
        );
    };

    return (
        <main className="main-container">
            <Routes>
                {/* ==================== */}
                {/* RUTAS PÚBLICAS */}
                {/* ==================== */}

                {/* Página principal pública - SOLO UNA RUTA "/" */}
                <Route path="/" element={<PublicHomePage />} />
                <Route path="/PublicHomePage" element={<PublicHomePage />} />
                <Route path="/ContactPage" element={<ContactPage />} />
                {/* Detalle de noticia pública */}
                <Route path="/noticia/:id" element={<NewsDetailPage />} />

                {/* Autenticación */}
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Página de no autorizado */}
                <Route path="/unauthorized" element={<UnauthorizedPage />} />

                {/* ==================== */}
                {/* RUTAS PROTEGIDAS */}
                {/* ==================== */}

                {/* Dashboard principal (redirige según rol) */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            {renderDashboard()}
                        </ProtectedRoute>
                    }
                />

                {/* Panel específico de reportero */}
                <Route
                    path="/reportero"
                    element={
                        <ProtectedRoute requiredRole="reportero">
                            <PanelReportero />
                        </ProtectedRoute>
                    }
                />

                {/* Panel específico de editor */}
                <Route
                    path="/editor"
                    element={
                        <ProtectedRoute requiredRole="editor">
                            <PanelEditor />
                        </ProtectedRoute>
                    }
                />

                {/* Crear nueva noticia (solo reporteros) */}
                <Route
                    path="/create-news"
                    element={
                        <ProtectedRoute requiredRole="reportero">
                            <NewsFormPage />
                        </ProtectedRoute>
                    }
                />

                {/* Editar noticia existente */}
                <Route
                    path="/edit-news/:id"
                    element={
                        <ProtectedRoute>
                            <NewsFormPage />
                        </ProtectedRoute>
                    }
                />

                {/* Dashboard simple (alternativa) */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                {/* ==================== */}
                {/* RUTA 404 - SIEMPRE AL FINAL */}
                {/* ==================== */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </main>
    );
};

export default Main;