import { db } from '../Config/firebase';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    orderBy,
    Timestamp
} from 'firebase/firestore';

console.log('🔄 [SERVICE] newsService.js cargado correctamente');
console.log('🔄 [SERVICE] db disponible:', !!db);

export const newsService = {
    // Crear noticia
    async createNews(newsData) {
        try {
            console.log('🔄 [SERVICE] createNews iniciado');
            console.log('📤 [SERVICE] Datos recibidos:', newsData);

            // Validar que tenemos los datos necesarios
            if (!newsData.titulo || !newsData.autor) {
                throw new Error('Datos incompletos para crear noticia');
            }

            const newsWithData = {
                titulo: newsData.titulo,
                subtitulo: newsData.subtitulo || '',
                contenido: newsData.contenido || '',
                categoria: newsData.categoria || '',
                imagen: newsData.imagen || '',
                autor: newsData.autor,
                autorEmail: newsData.autorEmail || '',
                fechaCreacion: Timestamp.now(),
                fechaActualizacion: Timestamp.now(),
                estado: 'Edición'
            };

            console.log('📝 [SERVICE] Datos finales para Firestore:', newsWithData);
            console.log('🔄 [SERVICE] Conectando a Firestore...');

            // Crear documento en Firestore
            const result = await addDoc(collection(db, 'news'), newsWithData);

            console.log('✅ [SERVICE] Noticia creada exitosamente');
            console.log('📄 [SERVICE] ID del documento:', result.id);

            return result;
        } catch (error) {
            console.error('❌ [SERVICE] Error en createNews:', error);
            console.error('❌ [SERVICE] Mensaje:', error.message);
            console.error('❌ [SERVICE] Código:', error.code);
            throw error;
        }
    },

    // Obtener noticias por usuario/rol
    async getNewsByUser(userId, role) {
        try {
            const newsRef = collection(db, 'news');
            let q;

            // REPORTERO: solo sus noticias
            if (role === 'reportero') {
                q = query(newsRef, where('autor', '==', userId));
            }
            // EDITOR: TODAS las noticias
            else {
                q = query(newsRef); // ← SIN filtro por usuario
            }

            const snapshot = await getDocs(q);
            let news = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                fechaCreacion: doc.data().fechaCreacion?.toDate(),
                fechaActualizacion: doc.data().fechaActualizacion?.toDate()
            }));

            // Ordenar manualmente
            news.sort((a, b) => b.fechaCreacion - a.fechaCreacion);
            return news;
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    },

    // Obtener noticia por ID
    async getNewsById(id) {
        try {
            console.log('🔄 [SERVICE] getNewsById iniciado');
            console.log('🔍 [SERVICE] Buscando noticia con ID:', id);

            const docRef = doc(db, 'news', id);
            console.log('🔄 [SERVICE] Referencia del documento creada');

            const docSnap = await getDoc(docRef);
            console.log('✅ [SERVICE] Documento obtenido, existe:', docSnap.exists());

            if (docSnap.exists()) {
                const data = docSnap.data();
                console.log('📄 [SERVICE] Datos del documento:', data);

                const result = {
                    id: docSnap.id,
                    ...data,
                    titulo: data.titulo || data.título || '',
                    subtitulo: data.subtitulo || data.subtítulo || '',
                    fechaCreacion: data.fechaCreacion?.toDate(),
                    fechaActualizacion: data.fechaActualizacion?.toDate()
                };

                console.log('✅ [SERVICE] Noticia procesada:', result);
                return result;
            }

            console.log('❌ [SERVICE] Documento no encontrado');
            return null;
        } catch (error) {
            console.error('❌ [SERVICE] Error en getNewsById:', error);
            console.error('❌ [SERVICE] Mensaje:', error.message);
            console.error('❌ [SERVICE] Código:', error.code);
            throw error;
        }
    },

    // Actualizar noticia
    async updateNews(id, newsData) {
        try {
            console.log('🔄 [SERVICE] updateNews iniciado');
            console.log('🔍 [SERVICE] Actualizando noticia ID:', id);
            console.log('📝 [SERVICE] Nuevos datos:', newsData);

            const newsWithData = {
                titulo: newsData.titulo,
                subtitulo: newsData.subtitulo || '',
                contenido: newsData.contenido || '',
                categoria: newsData.categoria || '',
                imagen: newsData.imagen || '',
                autor: newsData.autor,
                autorEmail: newsData.autorEmail || '',
                fechaActualizacion: Timestamp.now()
            };

            console.log('📝 [SERVICE] Datos para actualizar:', newsWithData);

            const docRef = doc(db, 'news', id);
            console.log('🔄 [SERVICE] Actualizando documento...');

            await updateDoc(docRef, newsWithData);
            console.log('✅ [SERVICE] Noticia actualizada exitosamente');

        } catch (error) {
            console.error('❌ [SERVICE] Error en updateNews:', error);
            console.error('❌ [SERVICE] Mensaje:', error.message);
            console.error('❌ [SERVICE] Código:', error.code);
            throw error;
        }
    },

    // Eliminar noticia
    async deleteNews(id) {
        try {
            console.log('🔄 [SERVICE] deleteNews iniciado');
            console.log('🗑 [SERVICE] Eliminando noticia ID:', id);

            const docRef = doc(db, 'news', id);
            await deleteDoc(docRef);

            console.log('✅ [SERVICE] Noticia eliminada exitosamente');

        } catch (error) {
            console.error('❌ [SERVICE] Error en deleteNews:', error);
            console.error('❌ [SERVICE] Mensaje:', error.message);
            console.error('❌ [SERVICE] Código:', error.code);
            throw error;
        }
    },

    // Cambiar estado de noticia
    async changeNewsStatus(id, nuevoEstado) {
        try {
            console.log('🔄 [SERVICE] changeNewsStatus iniciado');
            console.log('🔄 [SERVICE] Cambiando estado de noticia:', id, '→', nuevoEstado);

            const docRef = doc(db, 'news', id);
            await updateDoc(docRef, {
                estado: nuevoEstado,
                fechaActualizacion: Timestamp.now()
            });

            console.log('✅ [SERVICE] Estado cambiado exitosamente');

        } catch (error) {
            console.error('❌ [SERVICE] Error en changeNewsStatus:', error);
            console.error('❌ [SERVICE] Mensaje:', error.message);
            console.error('❌ [SERVICE] Código:', error.code);
            throw error;
        }
    },

    // Obtener noticias públicas
    async getPublicNews() {
        try {
            console.log('🔄 [SERVICE] Buscando noticias públicas...');

            const q = query(
                collection(db, 'news'),
                where('estado', '==', 'Publicado')
            );

            const snapshot = await getDocs(q);
            console.log('✅ [SERVICE] Noticias públicas encontradas:', snapshot.docs.length);

            let news = snapshot.docs.map(doc => {
                const data = doc.data();
                console.log('📄 [SERVICE] Noticia:', data.titulo, '- Estado:', data.estado);

                return {
                    id: doc.id,
                    ...data,
                    titulo: data.titulo || data.título || 'Sin título',
                    subtitulo: data.subtitulo || data.subtítulo || '',
                    fechaCreacion: data.fechaCreacion?.toDate() || new Date(),
                    fechaActualizacion: data.fechaActualizacion?.toDate() || new Date()
                };
            });

            // Ordenar por fecha (más recientes primero)
            news.sort((a, b) => b.fechaCreacion - a.fechaCreacion);
            console.log('✅ [SERVICE] Noticias públicas listas:', news.length);

            return news;
        } catch (error) {
            console.error('❌ [SERVICE] Error en getPublicNews:', error);
            // Si hay error de índice, devolver array vacío temporalmente
            return [];
        }
    }
};

console.log('✅ [SERVICE] newsService exportado correctamente');
console.log('🔧 [SERVICE] Funciones disponibles:', Object.keys(newsService));
