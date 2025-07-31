// Configuración centralizada de imágenes para JJ Vivero
// Aquí puedes cambiar fácilmente las URLs de las imágenes

const imageConfig = {
    // Imágenes de productos - Puedes cambiar estas URLs cuando quieras
    productos: {
        monstera: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        pothos: "https://images.unsplash.com/photo-1586093248292-4e6636b4e3b8?w=400&h=300&fit=crop",
        sansevieria: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=300&fit=crop",
        ficus: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        calathea: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&h=300&fit=crop",
        aloe: "https://images.unsplash.com/photo-1509423350716-97f2360af2e4?w=400&h=300&fit=crop",
        rosa_desierto: "https://images.unsplash.com/photo-1509423350716-97f2360af2e4?w=400&h=300&fit=crop",
        albahaca: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400&h=300&fit=crop",
        limonero: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400&h=300&fit=crop",
        hortensia: "https://images.unsplash.com/photo-1595207133874-8b9d7e5b8b8b?w=400&h=300&fit=crop"
    },
    
    // Imágenes locales alternativas (cuando subas tus propias fotos)
    productosLocales: {
        monstera: "images/monstera.jpg",
        pothos: "images/pothos.jpg", 
        sansevieria: "images/sansevieria.jpg",
        ficus: "images/ficus.jpg",
        calathea: "images/calathea.jpg",
        aloe: "images/aloe.jpg",
        rosa_desierto: "images/rosa_desierto.jpg",
        albahaca: "images/albahaca.jpg",
        limonero: "images/limonero.jpg",
        hortensia: "images/hortensia.jpg"
    },
    
    // Configuración para usar imágenes locales o externas
    useLocalImages: false, // Cambia a true para usar imágenes locales
    
    // Función para obtener la URL de imagen correcta
    getImageUrl: function(plantKey) {
        if (this.useLocalImages) {
            return this.productosLocales[plantKey] || this.productos[plantKey];
        }
        return this.productos[plantKey];
    },
    
    // Imágenes para la sección Hero (carrusel)
    hero: {
        slide1: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=800&fit=crop",
        slide2: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&h=800&fit=crop", 
        slide3: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
        slide4: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop"
    },
    
    // Imágenes locales para hero
    heroLocales: {
        slide1: "images/hero1.jpg",
        slide2: "images/hero2.jpg",
        slide3: "images/hero3.jpg", 
        slide4: "images/hero4.jpg"
    },
    
    // Función para obtener imágenes del hero
    getHeroImageUrl: function(slideKey) {
        if (this.useLocalImages) {
            return this.heroLocales[slideKey] || this.hero[slideKey];
        }
        return this.hero[slideKey];
    },
    
    // Obtener todas las imágenes del hero como array
    getHeroImages: function() {
        const keys = Object.keys(this.hero);
        return keys.map(key => ({
            key: key,
            url: this.getHeroImageUrl(key)
        }));
    },
    
    // Imágenes de respaldo en caso de error
    fallbackImage: "images/placeholder.svg",
    
    // Función para guardar configuración en localStorage
    guardarEnLocalStorage: function() {
        try {
            const datos = {
                productos: this.productos,
                productosLocales: this.productosLocales,
                hero: this.hero,
                heroLocales: this.heroLocales,
                useLocalImages: this.useLocalImages
            };
            localStorage.setItem('jj_vivero_images_config', JSON.stringify(datos));
            console.log('✅ Configuración de imágenes guardada en localStorage');
        } catch (e) {
            console.error('❌ Error guardando configuración de imágenes:', e);
        }
    },
    
    // Función para cargar configuración desde localStorage
    cargarDesdeLocalStorage: function() {
        try {
            const datosStr = localStorage.getItem('jj_vivero_images_config');
            if (datosStr) {
                const datos = JSON.parse(datosStr);
                this.productos = { ...this.productos, ...datos.productos };
                this.productosLocales = { ...this.productosLocales, ...datos.productosLocales };
                this.hero = { ...this.hero, ...datos.hero };
                this.heroLocales = { ...this.heroLocales, ...datos.heroLocales };
                this.useLocalImages = datos.useLocalImages !== undefined ? datos.useLocalImages : this.useLocalImages;
                console.log('✅ Configuración de imágenes cargada desde localStorage');
                return true;
            }
        } catch (e) {
            console.error('❌ Error cargando configuración de imágenes:', e);
        }
        return false;
    },
    
    // Función para inicializar
    inicializar: function() {
        this.cargarDesdeLocalStorage();
        return this;
    }
};

// Exportar la configuración para uso global
if (typeof window !== 'undefined') {
    window.imageConfig = imageConfig.inicializar();
}