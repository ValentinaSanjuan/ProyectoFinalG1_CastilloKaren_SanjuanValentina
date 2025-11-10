import React from 'react';
import { useAuth } from '../../Componentes/Context/AuthContext';

const DashboardPage = () => {
    const { userRole, currentUser } = useAuth();

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h2>Dashboard Principal</h2>
                        </div>
                        <div className="card-body">
                            <p><strong>Usuario:</strong> {currentUser?.email}</p>
                            <p><strong>Rol:</strong> {userRole}</p>
                            <p><strong>Bienvenido al sistema de gestión de noticias</strong></p>

                            {userRole === 'editor' && (
                                <div className="alert alert-info">
                                    <h5>Funciones de Editor</h5>
                                    <ul>
                                        <li>Revisar y aprobar noticias</li>
                                        <li>Publicar/despublicar noticias</li>
                                        <li>Gestionar todas las noticias</li>
                                    </ul>
                                </div>
                            )}

                            {userRole === 'reportero' && (
                                <div className="alert alert-warning">
                                    <h5>Funciones de Reportero</h5>
                                    <ul>
                                        <li>Crear nuevas noticias</li>
                                        <li>Editar mis noticias</li>
                                        <li>Enviar noticias para revisión</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;