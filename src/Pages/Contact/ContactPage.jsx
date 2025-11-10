import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simular envío del formulario
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });

            // Limpiar mensaje de éxito después de 5 segundos
            setTimeout(() => setSubmitStatus(null), 5000);
        }, 2000);
    };

    return (
        <div className="contacto-page">
            {/* Hero Section */}
            <section className="contacto-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="title-gradient-blue">Contáctanos</h1>
                        <p className="hero-subtitle">
                            Estamos aquí para ayudarte. Escríbenos y te responderemos a la brevedad.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="contacto-content">
                <div className="container">
                    <div className="contacto-grid">
                        {/* Información de Contacto */}
                        <div className="contacto-info">
                            <h2>Hablemos</h2>
                            <p className="info-description">
                                ¿Tienes alguna pregunta, sugerencia o necesitas más información?
                                No dudes en ponerte en contacto con nuestro equipo.
                            </p>

                            <div className="contact-methods">
                                <div className="contact-method">
                                    <div className="method-icon">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div className="method-info">
                                        <h4>Email</h4>
                                        <p>contacto@notisphere.com</p>
                                        <span>Te respondemos en 24 horas</span>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="method-icon">
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div className="method-info">
                                        <h4>Teléfono</h4>
                                        <p>+57 (311) 579-6161</p>
                                        <span>Lun-Vie 9:00-18:00</span>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="method-icon">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="method-info">
                                        <h4>Oficina</h4>
                                        <p>Av. Principal 123</p>
                                        <span>Florencia Caquetá, Colombia</span>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="method-icon">
                                        <i className="fas fa-clock"></i>
                                    </div>
                                    <div className="method-info">
                                        <h4>Horarios</h4>
                                        <p>Lunes a Viernes</p>
                                        <span>9:00 AM - 6:00 PM</span>
                                    </div>
                                </div>
                            </div>

                            <div className="social-links">
                                <h4>Síguenos en redes</h4>
                                <div className="social-icons">
                                    <a href="#" className="social-link">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="#" className="social-link">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="#" className="social-link">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                    <a href="#" className="social-link">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Formulario de Contacto */}
                        <div className="contacto-form-container">
                            <div className="form-card">
                                <h3>Envíanos un mensaje</h3>

                                {submitStatus === 'success' && (
                                    <div className="alert alert-success">
                                        <i className="fas fa-check-circle"></i>
                                        ¡Mensaje enviado con éxito! Te contactaremos pronto.
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="contacto-form">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Nombre completo *</label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            required
                                            placeholder="Tu nombre completo"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="tu.email@ejemplo.com"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="asunto">Asunto *</label>
                                        <input
                                            type="text"
                                            id="asunto"
                                            name="asunto"
                                            value={formData.asunto}
                                            onChange={handleChange}
                                            required
                                            placeholder="¿Cuál es el asunto?"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="mensaje">Mensaje *</label>
                                        <textarea
                                            id="mensaje"
                                            name="mensaje"
                                            value={formData.mensaje}
                                            onChange={handleChange}
                                            required
                                            rows="6"
                                            placeholder="Describe tu consulta o mensaje..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="read-more"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin"></i>
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-paper-plane"></i>
                                                Enviar mensaje
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="map-section">
                <div className="container">
                    <div className="map-container">
                        <h3>Nuestra ubicación</h3>
                        <p>Visítanos en nuestro local</p>
                        <div className="map-embed">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d6007.087070014755!2d-75.63288053258438!3d1.6056871047558772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sBar%20Colombia!5e0!3m2!1ses!2sco!4v1762697757109!5m2!1ses!2sco"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación de nuestro local"
                            ></iframe>
                        </div>
                        <div className="map-actions">
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Bar+Colombia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="read-more"
                            >
                                <i className="fas fa-directions"></i>
                                Abrir en Google Maps
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;