import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="container text-center mt-5">
            <h1>404 - Página No Encontrada</h1>
            <p>La página que buscas no existe.</p>
            <Link to="/" className="btn btn-primary">
                Volver al Inicio
            </Link>
        </div>
    );
};

export default NotFoundPage;