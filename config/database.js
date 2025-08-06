// Configuración de base de datos JSONBin (GRATIS)
const databaseConfig = {
    // REEMPLAZA ESTOS VALORES CON LOS TUYOS DE JSONBIN.IO
    binId: '68925210f7e7a370d1f4a123',  // Solo el ID del bin, sin la URL
    apiKey: '$2a$10$fb3/5mvY89MmSggllnxLS.Agm9ceGNd/wT7phUTF3R/LrVFR/g8Gu', // Copia el Master Key de tu cuenta

    // URL base de JSONBin
    baseUrl: 'https://api.jsonbin.io/v3/b/',

    // Función para obtener datos
    async obtenerDatos() {
        try {
            const response = await fetch(`${this.baseUrl}${this.binId}/latest`, {
                headers: {
                    'X-Master-Key': this.apiKey
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data.record;
            }
            throw new Error('Error al obtener datos');
        } catch (error) {
            console.error('Error obteniendo datos:', error);
            return null;
        }
    },

    // Función para guardar datos
    async guardarDatos(datos) {
        try {
            console.log('🔄 Intentando guardar en JSONBin:', datos);

            const response = await fetch(`${this.baseUrl}${this.binId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': this.apiKey
                },
                body: JSON.stringify(datos)
            });

            console.log('📡 Respuesta de JSONBin:', response.status, response.statusText);

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Datos guardados en la nube:', result);
                return true;
            } else {
                const errorText = await response.text();
                console.error('❌ Error de JSONBin:', response.status, errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
        } catch (error) {
            console.error('❌ Error guardando datos:', error);
            return false;
        }
    },

    // Función para probar la conexión
    async probarConexion() {
        console.log('🧪 Probando conexión con JSONBin...');
        console.log('📋 Bin ID:', this.binId);
        console.log('🔑 API Key:', this.apiKey.substring(0, 10) + '...');

        // Intentar obtener datos
        const datos = await this.obtenerDatos();
        if (datos) {
            console.log('✅ Conexión exitosa - Datos obtenidos:', datos);
            return true;
        } else {
            console.log('❌ No se pudieron obtener datos');
            return false;
        }
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.databaseConfig = databaseConfig;

    // Función para probar la conexión desde la consola
    window.probarJSONBin = async function () {
        return await databaseConfig.probarConexion();
    };

    // Función para inicializar datos por defecto
    window.inicializarJSONBin = async function () {
        const datosIniciales = {
            productos: [
                {
                    id: 1,
                    nombre: "Monstera Deliciosa",
                    nombreCientifico: "Monstera deliciosa",
                    precio: "$45.000",
                    descripcion: "Planta tropical de interior perfecta para espacios con luz indirecta.",
                    imagenKey: "monstera",
                    categoria: "Interior",
                    disponible: true,
                    cuidados: {
                        riego: "2-3 veces por semana",
                        luz: "Luz indirecta brillante",
                        suelo: "Suelo bien drenado y húmedo"
                    }
                }
            ],
            nextId: 2,
            imageConfig: {
                productos: {
                    monstera: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                },
                productosLocales: {
                    monstera: "images/monstera.jpg"
                },
                hero: {
                    slide1: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&fit=crop"
                },
                heroLocales: {
                    slide1: "images/hero1.jpg"
                },
                useLocalImages: false
            }
        };

        console.log('🔄 Inicializando JSONBin con datos por defecto...');
        const guardado = await databaseConfig.guardarDatos(datosIniciales);
        if (guardado) {
            console.log('✅ JSONBin inicializado correctamente');
        } else {
            console.log('❌ Error inicializando JSONBin');
        }
        return guardado;
    };
}