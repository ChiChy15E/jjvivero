// Variables globales para el catálogo
let productos = [];
let categoriaActual = 'todas';
let terminoBusqueda = '';

// Función para obtener la URL de imagen de un producto
function obtenerImagenProducto(imagenKey) {
    // Verificar si existe la configuración de imágenes
    if (typeof window.imageConfig !== 'undefined') {
        const url = window.imageConfig.getImageUrl(imagenKey);
        console.log(`Obteniendo imagen para ${imagenKey}: ${url} (modo local: ${window.imageConfig.useLocalImages})`);
        return url;
    }
    // Fallback si no hay configuración
    const fallback = window.imageConfig?.fallbackImage || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23c6f6d5' width='400' height='300'/%3E%3Cpath fill='%232f855a' d='M200,150 L180,120 L220,120 Z M200,150 L200,200 M180,180 Q200,160 220,180'/%3E%3C/svg%3E";
    console.log(`Usando fallback para ${imagenKey}: ${fallback}`);
    return fallback;
}

// Función para crear el HTML de una tarjeta de producto
function crearTarjetaProducto(producto) {
    const imagenUrl = obtenerImagenProducto(producto.imagenKey);

    return `
        <div class="product-card">
            <img src="${imagenUrl}" alt="${producto.nombre}" class="product-image" loading="lazy" onerror="this.src='${window.imageConfig?.fallbackImage || ''}'; this.onerror=null;">
            <div class="product-info">
                <div class="product-names">
                    <h3 class="product-name">${producto.nombre}</h3>
                    <p class="scientific-name">${producto.nombreCientifico}</p>
                </div>
                <div class="product-price">${producto.precio}</div>
                <p class="product-description">${producto.descripcion}</p>
                
                <div class="care-info">
                    <h4><i class="fas fa-leaf"></i> Cuidados</h4>
                    <div class="care-item">
                        <i class="fas fa-tint"></i>
                        <span><strong>Riego:</strong> ${producto.cuidados.riego}</span>
                    </div>
                    <div class="care-item">
                        <i class="fas fa-sun"></i>
                        <span><strong>Luz:</strong> ${producto.cuidados.luz}</span>
                    </div>
                    <div class="care-item">
                        <i class="fas fa-seedling"></i>
                        <span><strong>Suelo:</strong> ${producto.cuidados.suelo}</span>
                    </div>
                </div>
                
                <button class="order-button" onclick="hacerPedido('${producto.nombre}', '${producto.precio}')">
                    <i class="fab fa-whatsapp"></i>
                    Hacer Pedido
                </button>
            </div>
        </div>
    `;
}

// Función para inicializar productos desde la base de datos
function inicializarProductos() {
    if (typeof window.productosDB !== 'undefined') {
        productos = window.productosDB.obtenerTodos();
        cargarProductos();
        crearFiltrosCategorias();
    }
}

// Función para cargar todos los productos en el DOM
function cargarProductos() {
    const contenedor = document.getElementById('products-container');
    if (!contenedor) return;

    let productosAMostrar = productos;

    // Filtrar por categoría
    if (categoriaActual !== 'todas') {
        productosAMostrar = productosAMostrar.filter(producto =>
            producto.categoria === categoriaActual
        );
    }

    // Filtrar por búsqueda
    if (terminoBusqueda) {
        productosAMostrar = productosAMostrar.filter(producto =>
            producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            producto.nombreCientifico.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            producto.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );
    }

    if (productosAMostrar.length === 0) {
        contenedor.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; color: #c6f6d5; margin-bottom: 20px;"></i>
                <h3 style="color: #2f855a; margin-bottom: 10px;">No se encontraron productos</h3>
                <p style="color: #718096;">Intenta con otros términos de búsqueda o categoría</p>
            </div>
        `;
        return;
    }

    contenedor.innerHTML = productosAMostrar.map(producto => crearTarjetaProducto(producto)).join('');

    // Aplicar animaciones a las nuevas tarjetas
    setTimeout(() => {
        animarTarjetas();
        manejarErroresImagenes();
    }, 100);
}

// Función para crear filtros de categorías
function crearFiltrosCategorias() {
    if (typeof window.productosDB === 'undefined') return;

    const categorias = window.productosDB.obtenerCategorias();
    const catalogSection = document.querySelector('.catalog .container');

    // Crear barra de filtros si no existe
    let filtrosContainer = document.getElementById('filtros-container');
    if (!filtrosContainer) {
        filtrosContainer = document.createElement('div');
        filtrosContainer.id = 'filtros-container';
        filtrosContainer.className = 'filtros-container';

        const sectionTitle = catalogSection.querySelector('.section-title');
        catalogSection.insertBefore(filtrosContainer, sectionTitle.nextSibling);
    }

    filtrosContainer.innerHTML = `
        <div class="filtros-wrapper">
            <div class="search-container">
                <input type="text" id="search-input" placeholder="Buscar plantas..." class="search-input">
                <i class="fas fa-search search-icon"></i>
            </div>
            <div class="categorias-container">
                <button class="categoria-btn active" onclick="filtrarPorCategoria('todas', this)">
                    <i class="fas fa-th"></i> Todas
                </button>
                ${categorias.map(categoria => `
                    <button class="categoria-btn" onclick="filtrarPorCategoria('${categoria}', this)">
                        <i class="fas fa-leaf"></i> ${categoria}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    // Configurar búsqueda en tiempo real
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            terminoBusqueda = e.target.value;
            cargarProductos();
        });
    }
}

// Función para manejar el pedido por WhatsApp
function hacerPedido(nombrePlanta, precio) {
    // Mensaje prellenado para WhatsApp
    const mensaje = `¡Hola! Me interesa la ${nombrePlanta} que tienen en su catálogo por ${precio}. 

¿Podrían darme más información sobre:
- Disponibilidad
- Tamaño de la planta
- Costo de envío
- Formas de pago

¡Gracias!`;

    // Número de WhatsApp del vivero (reemplazar con el número real)
    const numeroWhatsApp = "18098814389"; // Formato: código país + número sin +

    // URL de WhatsApp con mensaje prellenado
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    // Abrir WhatsApp en una nueva ventana/pestaña
    window.open(urlWhatsApp, '_blank');
}

// Función para scroll suave en los enlaces de navegación
function configurarScrollSuave() {
    const enlaces = document.querySelectorAll('a[href^="#"]');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();

            const destino = document.querySelector(this.getAttribute('href'));
            if (destino) {
                const offsetTop = destino.offsetTop - 80; // Ajuste para el header fijo

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función para manejar el efecto de scroll en el header
function manejarScrollHeader() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 77, 58, 0.95)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.borderBottom = '3px solid rgba(255, 255, 255, 0.2)';
        } else {
            header.style.background = 'linear-gradient(135deg, #1a4d3a 0%, #2f855a 50%, #38a169 100%)';
            header.style.backdropFilter = 'none';
            header.style.borderBottom = '3px solid rgba(255, 255, 255, 0.1)';
        }
    });
}

// Función para animación de entrada de las tarjetas
function animarTarjetas() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Aplicar animación inicial a las tarjetas
    setTimeout(() => {
        const tarjetas = document.querySelectorAll('.product-card');
        tarjetas.forEach((tarjeta, index) => {
            tarjeta.style.opacity = '0';
            tarjeta.style.transform = 'translateY(30px)';
            tarjeta.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(tarjeta);
        });
    }, 100);
}

// Función para manejar errores de carga de imágenes
function manejarErroresImagenes() {
    const imagenes = document.querySelectorAll('.product-image');

    imagenes.forEach(img => {
        img.addEventListener('error', function () {
            // Imagen de respaldo con un gradiente y icono
            this.style.background = 'linear-gradient(45deg, #c6f6d5, #9ae6b4)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.innerHTML = '<i class="fas fa-leaf" style="font-size: 3rem; color: #2f855a; opacity: 0.7;"></i>';
            this.alt = 'Imagen no disponible';
        });
    });
}

// Función para escuchar eventos del admin
function configurarListenerAdmin() {
    // Verificar periódicamente si hay actualizaciones del admin
    let ultimoTimestamp = localStorage.getItem('jj_vivero_ultimo_check') || '0';

    // Polling cada 2 segundos para detectar cambios
    const intervalId = setInterval(() => {
        const eventoStr = localStorage.getItem('jj_vivero_admin_update');
        if (eventoStr) {
            try {
                const evento = JSON.parse(eventoStr);

                // Solo procesar si es un evento nuevo
                if (evento.timestamp > parseInt(ultimoTimestamp)) {
                    console.log('📡 Evento detectado del admin:', evento);

                    // Actualizar último timestamp
                    ultimoTimestamp = evento.timestamp.toString();
                    localStorage.setItem('jj_vivero_ultimo_check', ultimoTimestamp);

                    // Mostrar notificación visual
                    mostrarNotificacionAdmin(evento.accion);

                    // Ejecutar acción correspondiente
                    setTimeout(() => {
                        switch (evento.accion) {
                            case 'crear':
                            case 'editar':
                            case 'eliminar':
                            case 'actualizar':
                                console.log('🔄 Ejecutando recarga de productos...');
                                recargarProductos();
                                break;
                            case 'cambio_modo':
                                console.log('🔄 Ejecutando cambio de modo...');
                                if (window.imageConfig) {
                                    window.imageConfig.useLocalImages = evento.datos.modoLocal;
                                }
                                recargarProductos();
                                inicializarHeroCarrusel();
                                break;
                            default:
                                recargarProductos();
                        }
                    }, 500);
                }
            } catch (error) {
                console.error('Error procesando evento del admin:', error);
            }
        }
    }, 2000); // Verificar cada 2 segundos

    // Guardar el ID del interval para poder limpiarlo si es necesario
    window.adminPollingInterval = intervalId;

    console.log('✅ Listeners del admin configurados (polling cada 2s)');
}

// Función para mostrar notificación visual
function mostrarNotificacionAdmin(accion) {
    const mensajes = {
        'crear': '➕ Nueva planta agregada',
        'editar': '✏️ Planta actualizada',
        'eliminar': '🗑️ Planta eliminada',
        'cambio_modo': '🔄 Modo de imágenes cambiado',
        'actualizar': '🔄 Catálogo actualizado'
    };

    const mensaje = mensajes[accion] || '🔄 Catálogo actualizado';

    // Crear notificación
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10000;
        background: #38a169; color: white; padding: 15px 25px;
        border-radius: 8px; font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(100%); transition: transform 0.3s ease;
    `;
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    // Animar entrada
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 100);

    // Animar salida
    setTimeout(() => {
        notificacion.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notificacion.parentNode) {
                document.body.removeChild(notificacion);
            }
        }, 300);
    }, 3000);
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Cargar configuración de modo de imágenes desde localStorage
    if (typeof window.imageConfig !== 'undefined') {
        const savedMode = localStorage.getItem('imageMode');
        if (savedMode) {
            window.imageConfig.useLocalImages = (savedMode === 'local');
        }
    }

    // Configurar listener para eventos del admin
    configurarListenerAdmin();

    // Inicializar carrusel hero
    inicializarHeroCarrusel();

    // Configurar funcionalidades
    configurarScrollSuave();
    manejarScrollHeader();
    configurarHoverPause();
    configurarGestosTactiles();

    console.log('JJ Vivero - Sitio web cargado correctamente');
});

// Escuchar cuando los productos estén listos
window.addEventListener('productosListos', function() {
    // Inicializar productos
    inicializarProductos();
    
    console.log(`✅ Se cargaron ${productos.length} productos desde la nube`);
    console.log(`Carrusel hero inicializado con ${heroImages.length} imágenes`);
});

// Función para filtrar por categoría
function filtrarPorCategoria(categoria, elemento) {
    categoriaActual = categoria;

    // Actualizar botones activos
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Si se pasa el elemento, usarlo; si no, buscar el botón activo
    if (elemento) {
        elemento.classList.add('active');
    } else {
        // Buscar el botón correspondiente a la categoría
        const botonCategoria = document.querySelector(`[onclick*="'${categoria}'"]`);
        if (botonCategoria) {
            botonCategoria.classList.add('active');
        }
    }

    cargarProductos();
}

// Función para recargar productos (útil después de agregar/editar)
function recargarProductos() {
    console.log('🔄 RECARGANDO PRODUCTOS DESDE EL ADMIN...');

    // Mostrar indicador visual temporal
    const body = document.body;
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10000;
        background: #38a169; color: white; padding: 10px 20px;
        border-radius: 5px; font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    indicator.textContent = '🔄 Actualizando catálogo...';
    body.appendChild(indicator);

    // Recargar configuración de modo de imágenes desde localStorage
    if (typeof window.imageConfig !== 'undefined') {
        // Cargar toda la configuración de imágenes
        window.imageConfig.cargarDesdeLocalStorage();

        const savedMode = localStorage.getItem('imageMode');
        if (savedMode) {
            window.imageConfig.useLocalImages = (savedMode === 'local');
            console.log('Modo de imágenes actualizado a:', savedMode, 'useLocalImages:', window.imageConfig.useLocalImages);
        }
    }

    if (typeof window.productosDB !== 'undefined') {
        const productosAnteriores = productos.length;

        // Recargar datos desde localStorage
        window.productosDB.cargarDesdeLocalStorage();
        productos = window.productosDB.obtenerTodos();
        const productosNuevos = productos.length;

        console.log(`📊 Productos: ${productosAnteriores} → ${productosNuevos} (${productosNuevos - productosAnteriores >= 0 ? '+' : ''}${productosNuevos - productosAnteriores})`);

        // Resetear filtros para mostrar todos los productos
        categoriaActual = 'todas';
        terminoBusqueda = '';

        cargarProductos();
        crearFiltrosCategorias();

        // Forzar recarga de todas las imágenes
        setTimeout(() => {
            const imagenes = document.querySelectorAll('.product-image');
            imagenes.forEach(img => {
                const producto = productos.find(p => p.nombre === img.alt);
                if (producto && producto.imagenKey) {
                    const nuevaUrl = window.imageConfig.getImageUrl(producto.imagenKey);
                    if (img.src !== nuevaUrl) {
                        img.src = nuevaUrl;
                        console.log('Imagen actualizada para', producto.nombre, ':', nuevaUrl);
                    }
                }
            });

            // Cambiar indicador a éxito
            indicator.style.background = '#48bb78';
            indicator.textContent = '✅ Catálogo actualizado';

            setTimeout(() => {
                body.removeChild(indicator);
            }, 2000);

            console.log('✅ RECARGA DE PRODUCTOS COMPLETADA');
        }, 100);
    } else {
        // Error - cambiar indicador
        indicator.style.background = '#e53e3e';
        indicator.textContent = '❌ Error al actualizar';
        setTimeout(() => {
            body.removeChild(indicator);
        }, 3000);

        console.log('❌ No se pudo acceder a la base de datos de productos');
    }
}

// Variables globales para el carrusel hero
let currentSlide = 0;
let heroImages = [];
let slideInterval;

// Función para inicializar el carrusel hero
function inicializarHeroCarrusel() {
    // Recargar configuración de modo de imágenes desde localStorage
    if (typeof window.imageConfig !== 'undefined') {
        const savedMode = localStorage.getItem('imageMode');
        if (savedMode) {
            window.imageConfig.useLocalImages = (savedMode === 'local');
        }

        heroImages = window.imageConfig.getHeroImages();
        crearSlidesHero();
        crearIndicadoresHero();
        iniciarAutoplay();
    }
}

// Función para crear los slides del hero
function crearSlidesHero() {
    const slidesContainer = document.getElementById('hero-slides');
    if (!slidesContainer) return;

    slidesContainer.innerHTML = heroImages.map((img, index) => `
        <div class="hero-slide ${index === 0 ? 'active' : ''}" 
             style="background-image: url('${img.url}')"
             data-slide="${index}">
        </div>
    `).join('');
}

// Función para crear los indicadores del hero
function crearIndicadoresHero() {
    const indicatorsContainer = document.getElementById('hero-indicators');
    if (!indicatorsContainer) return;

    indicatorsContainer.innerHTML = heroImages.map((_, index) => `
        <div class="hero-indicator ${index === 0 ? 'active' : ''}" 
             onclick="irASlide(${index})"
             data-slide="${index}">
        </div>
    `).join('');
}

// Función para cambiar slide
function cambiarSlide(direction) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicator');

    if (slides.length === 0) return;

    // Remover clase active del slide actual
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    // Calcular nuevo slide
    currentSlide += direction;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    // Activar nuevo slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');

    // Reiniciar autoplay
    reiniciarAutoplay();
}

// Función para ir a un slide específico
function irASlide(slideIndex) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicator');

    if (slideIndex === currentSlide || slides.length === 0) return;

    // Remover clase active del slide actual
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    // Activar nuevo slide
    currentSlide = slideIndex;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');

    // Reiniciar autoplay
    reiniciarAutoplay();
}

// Función para iniciar autoplay
function iniciarAutoplay() {
    slideInterval = setInterval(() => {
        cambiarSlide(1);
    }, 5000); // Cambiar cada 5 segundos
}

// Función para reiniciar autoplay
function reiniciarAutoplay() {
    clearInterval(slideInterval);
    iniciarAutoplay();
}

// Función para pausar autoplay al hacer hover
function configurarHoverPause() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        hero.addEventListener('mouseleave', () => {
            iniciarAutoplay();
        });
    }
}

// Función para manejar gestos táctiles en móviles
function configurarGestosTactiles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let startX = 0;
    let endX = 0;

    hero.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    hero.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                cambiarSlide(1); // Swipe left - next slide
            } else {
                cambiarSlide(-1); // Swipe right - previous slide
            }
        }
    }
}

// Exportar funciones para uso global (si es necesario)
window.hacerPedido = hacerPedido;
window.filtrarPorCategoria = filtrarPorCategoria;
window.recargarProductos = recargarProductos;
window.cambiarSlide = cambiarSlide;
window.irASlide = irASlide;

// Función de debug para probar el cambio de modo manualmente
function testearCambioModo() {
    console.log('=== ESTADO ACTUAL ===');
    console.log('localStorage imageMode:', localStorage.getItem('imageMode'));
    console.log('window.imageConfig.useLocalImages:', window.imageConfig?.useLocalImages);

    // Cambiar modo
    const modoActual = localStorage.getItem('imageMode');
    const nuevoModo = modoActual === 'local' ? 'external' : 'local';

    localStorage.setItem('imageMode', nuevoModo);
    if (window.imageConfig) {
        window.imageConfig.useLocalImages = (nuevoModo === 'local');
    }

    console.log('=== NUEVO ESTADO ===');
    console.log('localStorage imageMode:', localStorage.getItem('imageMode'));
    console.log('window.imageConfig.useLocalImages:', window.imageConfig?.useLocalImages);

    // Recargar productos
    recargarProductos();
    inicializarHeroCarrusel();

    console.log('Modo cambiado a:', nuevoModo);
}

// Hacer la función disponible globalmente para testing
window.testearCambioModo = testearCambioModo;

// Función de debug para probar la recarga manual de productos
function testearRecargaProductos() {
    console.log('🧪 Probando recarga manual de productos...');
    console.log('Productos actuales:', productos.length);

    recargarProductos();

    setTimeout(() => {
        console.log('Productos después de recarga:', productos.length);
        console.log('Categorías disponibles:', window.productosDB?.obtenerCategorias());
    }, 200);
}

// Función para forzar recarga completa (útil si la recarga normal falla)
function forzarRecargaCompleta() {
    console.log('🔄 FORZANDO RECARGA COMPLETA...');

    // Mostrar mensaje
    alert('🔄 Recargando página para mostrar cambios...');

    // Recargar página
    window.location.reload();
}

// Hacer las funciones disponibles globalmente para testing
window.testearRecargaProductos = testearRecargaProductos;
window.forzarRecargaCompleta = forzarRecargaCompleta;

// Función para simular evento del admin (para testing)
function simularEventoAdmin(accion = 'crear') {
    console.log('🧪 Simulando evento del admin:', accion);

    const evento = {
        accion: accion,
        timestamp: Date.now(),
        datos: {
            modoLocal: window.imageConfig?.useLocalImages || false,
            totalProductos: productos.length
        }
    };

    // Usar la nueva clave de localStorage
    localStorage.setItem('jj_vivero_admin_update', JSON.stringify(evento));
    console.log('✅ Evento simulado guardado en localStorage');
}

// Hacer la función disponible globalmente para testing
window.simularEventoAdmin = simularEventoAdmin;

// Función para limpiar el polling (útil para debug)
function detenerPollingAdmin() {
    if (window.adminPollingInterval) {
        clearInterval(window.adminPollingInterval);
        console.log('🛑 Polling del admin detenido');
    }
}

// Función para reiniciar el polling
function reiniciarPollingAdmin() {
    detenerPollingAdmin();
    configurarListenerAdmin();
    console.log('🔄 Polling del admin reiniciado');
}

// Hacer las funciones disponibles globalmente para testing
window.detenerPollingAdmin = detenerPollingAdmin;
window.reiniciarPollingAdmin = reiniciarPollingAdmin;

// Función para limpiar datos de localStorage (útil para testing)
function limpiarDatosLocalStorage() {
    localStorage.removeItem('jj_vivero_productos');
    localStorage.removeItem('jj_vivero_admin_update');
    localStorage.removeItem('jj_vivero_ultimo_check');
    console.log('🧹 Datos de localStorage limpiados');

    // Recargar página para usar datos por defecto
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

// Función para ver datos actuales en localStorage
function verDatosLocalStorage() {
    const productos = localStorage.getItem('jj_vivero_productos');
    const eventos = localStorage.getItem('jj_vivero_admin_update');

    console.log('📦 Productos en localStorage:', productos ? JSON.parse(productos) : 'No hay datos');
    console.log('📡 Eventos en localStorage:', eventos ? JSON.parse(eventos) : 'No hay eventos');
}

// Hacer las funciones disponibles globalmente
window.limpiarDatosLocalStorage = limpiarDatosLocalStorage;
window.verDatosLocalStorage = verDatosLocalStorage;