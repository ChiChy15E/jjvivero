// Base de datos de productos del vivero - Sistema infinito
// Aquí puedes agregar tantas plantas como quieras

const productosDB = {
    // Productos iniciales
    productos: [
        {
            id: 1,
            nombre: "Monstera Deliciosa",
            nombreCientifico: "Monstera deliciosa",
            precio: "$45.000",
            descripcion: "Planta tropical de interior perfecta para espacios con luz indirecta. Sus hojas grandes y perforadas la convierten en una favorita para decoración moderna.",
            imagenKey: "monstera",
            categoria: "Interior",
            disponible: true,
            cuidados: {
                riego: "2-3 veces por semana",
                luz: "Luz indirecta brillante",
                suelo: "Suelo bien drenado y húmedo"
            }
        },
        {
            id: 2,
            nombre: "Pothos Dorado",
            nombreCientifico: "Epipremnum aureum",
            precio: "$25.000",
            descripcion: "Planta colgante muy resistente, ideal para principiantes. Purifica el aire y crece rápidamente en diversas condiciones de luz.",
            imagenKey: "pothos",
            categoria: "Interior",
            disponible: true,
            cuidados: {
                riego: "1-2 veces por semana",
                luz: "Luz indirecta a sombra parcial",
                suelo: "Suelo con buen drenaje"
            }
        },
        {
            id: 3,
            nombre: "Sansevieria",
            nombreCientifico: "Sansevieria trifasciata",
            precio: "$35.000",
            descripcion: "También conocida como 'Lengua de Suegra'. Extremadamente resistente y perfecta para oficinas. Libera oxígeno durante la noche.",
            imagenKey: "sansevieria",
            categoria: "Interior",
            disponible: true,
            cuidados: {
                riego: "Cada 2-3 semanas",
                luz: "Luz indirecta a sombra",
                suelo: "Suelo arenoso y bien drenado"
            }
        },
        {
            id: 4,
            nombre: "Ficus Lyrata",
            nombreCientifico: "Ficus lyrata",
            precio: "$85.000",
            descripcion: "El famoso 'Fiddle Leaf Fig'. Árbol de interior elegante con hojas grandes en forma de violín. Perfecto como planta focal en espacios amplios.",
            imagenKey: "ficus",
            categoria: "Interior",
            disponible: true,
            cuidados: {
                riego: "1 vez por semana",
                luz: "Luz brillante indirecta",
                suelo: "Suelo rico y bien drenado"
            }
        },
        {
            id: 5,
            nombre: "Calathea Ornata",
            nombreCientifico: "Calathea ornata",
            precio: "$55.000",
            descripcion: "Hermosa planta con hojas rayadas en rosa y verde. Sus hojas se mueven siguiendo la luz del día. Ideal para espacios húmedos.",
            imagenKey: "calathea",
            categoria: "Interior",
            disponible: true,
            cuidados: {
                riego: "2-3 veces por semana",
                luz: "Luz indirecta media",
                suelo: "Suelo húmedo y bien drenado"
            }
        },
        {
            id: 6,
            nombre: "Aloe Vera",
            nombreCientifico: "Aloe barbadensis",
            precio: "$20.000",
            descripcion: "Planta suculenta medicinal con múltiples beneficios. Fácil de cuidar y perfecta para principiantes. Sus hojas contienen gel curativo.",
            imagenKey: "aloe",
            categoria: "Suculentas",
            disponible: true,
            cuidados: {
                riego: "Cada 2-3 semanas",
                luz: "Sol directo a indirecto",
                suelo: "Suelo arenoso y seco"
            }
        },
        {
            id: 7,
            nombre: "Rosa del Desierto",
            nombreCientifico: "Adenium obesum",
            precio: "$65.000",
            descripcion: "Hermosa planta suculenta con flores rosadas. Perfecta para exteriores soleados y jardines desérticos.",
            imagenKey: "rosa_desierto",
            categoria: "Exterior",
            disponible: true,
            cuidados: {
                riego: "1 vez por semana",
                luz: "Sol directo",
                suelo: "Suelo arenoso y bien drenado"
            }
        },
        {
            id: 8,
            nombre: "Albahaca",
            nombreCientifico: "Ocimum basilicum",
            precio: "$15.000",
            descripcion: "Hierba aromática esencial para la cocina. Fácil de cultivar y perfecta para huertos caseros.",
            imagenKey: "albahaca",
            categoria: "Aromáticas",
            disponible: true,
            cuidados: {
                riego: "Diariamente",
                luz: "Sol directo a indirecto",
                suelo: "Suelo húmedo y fértil"
            }
        },
        {
            id: 9,
            nombre: "Limonero",
            nombreCientifico: "Citrus limon",
            precio: "$120.000",
            descripcion: "Árbol frutal que produce limones frescos. Ideal para patios y jardines con buen sol.",
            imagenKey: "limonero",
            categoria: "Frutales",
            disponible: true,
            cuidados: {
                riego: "2-3 veces por semana",
                luz: "Sol directo",
                suelo: "Suelo bien drenado y fértil"
            }
        },
        {
            id: 10,
            nombre: "Hortensia",
            nombreCientifico: "Hydrangea macrophylla",
            precio: "$45.000",
            descripcion: "Arbusto ornamental con hermosas flores en racimos. Colores que van del azul al rosa según el pH del suelo.",
            imagenKey: "hortensia",
            categoria: "Ornamentales",
            disponible: true,
            cuidados: {
                riego: "Frecuente, mantener húmedo",
                luz: "Sombra parcial",
                suelo: "Suelo ácido y húmedo"
            }
        }
    ],
    
    // Contador para IDs únicos
    nextId: 11,
    
    // Función para obtener todos los productos
    obtenerTodos: function() {
        return this.productos.filter(producto => producto.disponible);
    },
    
    // Función para obtener producto por ID
    obtenerPorId: function(id) {
        return this.productos.find(producto => producto.id === id);
    },
    
    // Función para agregar nuevo producto
    agregar: function(producto) {
        const nuevoProducto = {
            ...producto,
            id: this.nextId++,
            disponible: true
        };
        this.productos.push(nuevoProducto);
        this.guardarEnLocalStorage();
        return nuevoProducto;
    },
    
    // Función para actualizar producto
    actualizar: function(id, datosActualizados) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index !== -1) {
            this.productos[index] = { ...this.productos[index], ...datosActualizados };
            this.guardarEnLocalStorage();
            return this.productos[index];
        }
        return null;
    },
    
    // Función para eliminar producto (marcar como no disponible)
    eliminar: function(id) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index !== -1) {
            this.productos[index].disponible = false;
            this.guardarEnLocalStorage();
            return true;
        }
        return false;
    },
    
    // Función para filtrar por categoría
    filtrarPorCategoria: function(categoria) {
        return this.productos.filter(producto => 
            producto.disponible && producto.categoria === categoria
        );
    },
    
    // Función para buscar productos
    buscar: function(termino) {
        const terminoLower = termino.toLowerCase();
        return this.productos.filter(producto => 
            producto.disponible && (
                producto.nombre.toLowerCase().includes(terminoLower) ||
                producto.nombreCientifico.toLowerCase().includes(terminoLower) ||
                producto.descripcion.toLowerCase().includes(terminoLower) ||
                producto.categoria.toLowerCase().includes(terminoLower)
            )
        );
    },
    
    // Función para obtener categorías únicas
    obtenerCategorias: function() {
        const categorias = [...new Set(this.productos
            .filter(producto => producto.disponible)
            .map(producto => producto.categoria))];
        return categorias.sort();
    },
    
    // Función para generar imagenKey automáticamente
    generarImagenKey: function(nombre) {
        return nombre.toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '')
            .substring(0, 20);
    },
    
    // Función para guardar en localStorage
    guardarEnLocalStorage: function() {
        try {
            const datos = {
                productos: this.productos,
                nextId: this.nextId
            };
            localStorage.setItem('jj_vivero_productos', JSON.stringify(datos));
            console.log('✅ Productos guardados en localStorage');
        } catch (e) {
            console.error('❌ Error guardando productos:', e);
        }
    },
    
    // Función para cargar desde localStorage
    cargarDesdeLocalStorage: function() {
        try {
            const datosStr = localStorage.getItem('jj_vivero_productos');
            if (datosStr) {
                const datos = JSON.parse(datosStr);
                this.productos = datos.productos || this.productos;
                this.nextId = datos.nextId || this.nextId;
                console.log('✅ Productos cargados desde localStorage:', this.productos.length);
                return true;
            }
        } catch (e) {
            console.error('❌ Error cargando productos:', e);
        }
        return false;
    },
    
    // Función para inicializar (cargar datos al inicio)
    inicializar: function() {
        const cargado = this.cargarDesdeLocalStorage();
        if (!cargado) {
            console.log('📦 Usando productos por defecto');
        }
        return this;
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.productosDB = productosDB.inicializar();
}