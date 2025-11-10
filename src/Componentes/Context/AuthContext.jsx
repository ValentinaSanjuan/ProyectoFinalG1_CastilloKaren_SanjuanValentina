/**
 * @file AuthContext.js
 * @description Contexto de autenticación que maneja el registro, inicio y cierre de sesión,
 * así como la gestión del rol del usuario dentro de la aplicación.
 * 
 * @author V
 * @date 2025-11-09
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../Config/firebase';

/* ============================================================
   Creación del contexto de autenticación
   Este contexto permite acceder a las funciones y estados
   relacionados con la autenticación en cualquier parte de la app.
============================================================ */
const AuthContext = createContext();

/**
 * Hook personalizado para acceder al contexto de autenticación
 * desde cualquier componente.
 * @returns {Object} - Devuelve los valores y funciones del AuthContext.
 */
export function useAuth() {
    return useContext(AuthContext);
}

/**
 * Proveedor de autenticación que envuelve toda la aplicación.
 * Maneja el estado del usuario actual, su rol y las operaciones
 * de login, registro y logout.
 * 
 * @param {Object} props
 * @param {JSX.Element} props.children - Componentes hijos que tendrán acceso al contexto.
 */
export function AuthProvider({ children }) {
    // Estado del usuario autenticado
    const [currentUser, setCurrentUser] = useState(null);

    // Estado del rol del usuario (editor o reportero)
    const [userRole, setUserRole] = useState(null);

    // Controla si la app sigue cargando el estado de autenticación
    const [loading, setLoading] = useState(true);

    /* ============================================================
       Función de inicio de sesión
       Inicia sesión con un correo y contraseña usando Firebase Auth.
       @param {string} email - Correo del usuario.
       @param {string} password - Contraseña del usuario.
       @returns {Promise<Object>} - Credenciales del usuario autenticado.
    ============================================================ */
    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    };

    /* ============================================================
       Función de registro de usuario
       Crea un nuevo usuario en Firebase Auth y guarda su información
       adicional (como el rol) en Firestore.
       @param {string} email - Correo electrónico del usuario.
       @param {string} password - Contraseña elegida.
       @param {string} [role='reportero'] - Rol asignado al usuario.
       @returns {Promise<Object>} - Credenciales del usuario creado.
    ============================================================ */
    const register = async (email, password, role = 'reportero') => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Guardar información adicional del usuario en la colección "users"
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            email: email,
            role: role,
            createdAt: new Date()
        });

        return userCredential;
    };

    /* ============================================================
       Función de cierre de sesión
       Cierra la sesión activa del usuario en Firebase Auth.
       @returns {Promise<void>}
    ============================================================ */
    const logout = () => {
        return signOut(auth);
    };

    /* ============================================================
       Efecto de escucha del estado de autenticación
       Monitorea los cambios en el usuario autenticado (login/logout)
       y obtiene el rol correspondiente desde Firestore.
    ============================================================ */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Si hay un usuario autenticado, se guarda su información
                setCurrentUser(user);

                try {
                    // Consultar el documento del usuario en Firestore
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        setUserRole(userDoc.data().role);
                    }
                } catch (error) {
                    console.error("Error obteniendo rol del usuario:", error);
                    setUserRole(null);
                }
            } else {
                // Si no hay usuario, se limpian los estados
                setCurrentUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });

        // Cancelar la suscripción al desmontar el componente
        return unsubscribe;
    }, []);

    /* ============================================================
       Valores expuestos por el contexto
       Contiene el usuario, su rol y las funciones de autenticación.
    ============================================================ */
    const value = {
        currentUser,
        userRole,
        login,
        register,
        logout,
        isAuthenticated: !!currentUser,
        isEditor: userRole === 'editor',
        isReporter: userRole === 'reportero'
    };

    /* ============================================================
       Proveedor del contexto
       Solo se renderizan los hijos cuando el estado de carga termina.
    ============================================================ */
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
