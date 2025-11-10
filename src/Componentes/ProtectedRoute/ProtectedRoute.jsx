import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Componentes/Context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { currentUser, userRole } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;