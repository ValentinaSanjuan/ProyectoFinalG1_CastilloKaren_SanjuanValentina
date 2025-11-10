import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
    return (
        <div className="container text-center mt-5">
            <div className="alert alert-warning">
                <h1>Acceso No Autorizado</h1>
                <p>No tienes permisos para acceder a esta página.</p>
                <Link to="/dashboard" className="btn btn-primary">
                    Volver al Dashboard
                </Link>
            </div>
        </div>
    );
};

export default UnauthorizedPage;