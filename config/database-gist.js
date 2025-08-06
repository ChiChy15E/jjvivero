// Configuración de base de datos usando GitHub Gist (GRATIS)
const databaseConfig = {
    // REEMPLAZA ESTOS VALORES CON LOS TUYOS DE GITHUB
    gistId: 'TU_GIST_ID_AQUI',  // Ejemplo: 'abc123def456'
    githubToken: 'TU_GITHUB_TOKEN_AQUI', // Token personal de GitHub
    fileName: 'jj-vivero-data.json', // Nombre del archivo en el gist
    
    // Función para obtener datos
    async obtenerDatos() {
        try {
            const response = await fetch(`https://api.github.com/gists/${this.gistId}`, {
                headers: {
                    'Authorization': `token ${this.githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            
            if (response.ok) {
                const gist = await response.json();
                const content = gist.files[this.fileName].content;
                return JSON.parse(content);
            }
            throw new Error('Error al obtener datos del gist');
        } catch (error) {
            console.error('Error obteniendo datos:', error);
            return null;
        }
    },
    
    // Función para guardar datos
    async guardarDatos(datos) {
        try {
            console.log('🔄 Guardando en GitHub Gist...');
            
            const response = await fetch(`https://api.github.com/gists/${this.gistId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `token ${this.githubToken}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    files: {
                        [this.fileName]: {
                            content: JSON.stringify(datos, null, 2)
                        }
                    }
                })
            });
            
            if (response.ok) {
                console.log('✅ Datos guardados en GitHub Gist');
                return true;
            }
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        } catch (error) {
            console.error('❌ Error guardando datos:', error);
            return false;
        }
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.databaseConfig = databaseConfig;
}