// Configuración de autenticación para JJ Vivero Admin
// IMPORTANTE: En un entorno de producción, esto debería estar en el servidor

const authConfig = {
    // Usuarios y contraseñas (en producción usar hash)
    usuarios: {
        'admin': 'jjvivero2024',
        'vivero': 'plantas123',
        'jjadmin': 'admin2024'
    },

    // Configuración de sesión
    sesion: {
        duracion: 4 * 60 * 60 * 1000, // 4 horas en milisegundos
        nombreCookie: 'jjvivero_session',
        nombreTiempo: 'jjvivero_session_time'
    },

    // Configuración de seguridad
    seguridad: {
        intentosMaximos: 3,
        tiempoBloqueo: 15 * 60 * 1000, // 15 minutos
        requiereHttps: false // Cambiar a true en producción
    },

    // Mensajes personalizados
    mensajes: {
        loginExitoso: '✅ Bienvenido {usuario}! Sesión iniciada correctamente',
        loginFallido: 'Usuario o contraseña incorrectos',
        sesionExpirada: '⏰ Tu sesión ha expirado. Por favor, inicia sesión nuevamente',
        sesionCerrada: '👋 Sesión cerrada correctamente',
        bloqueado: '🔒 Demasiados intentos fallidos. Intenta de nuevo en 15 minutos'
    }
};

// Exportar configuración
if (typeof window !== 'undefined') {
    window.authConfig = authConfig;
}