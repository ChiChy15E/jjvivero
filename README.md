# 🌱 JJ Vivero - Sitio Web Completo

Un sitio web moderno y completo para vivero con sistema de administración, catálogo infinito de plantas y carrusel de imágenes hero.

## 🚀 Demo en Vivo

- **Sitio Web**: [https://tu-usuario.github.io/jj-vivero](https://tu-usuario.github.io/jj-vivero)
- **Panel Admin**: [https://tu-usuario.github.io/jj-vivero/admin.html](https://tu-usuario.github.io/jj-vivero/admin.html)

## ✨ Características Principales

### 🏠 **Sitio Web Principal**
- **Diseño responsivo** moderno con colores naturales
- **Carrusel hero** con 4 imágenes rotativas y controles
- **Catálogo infinito** de plantas con filtros dinámicos
- **Sistema de búsqueda** en tiempo real
- **Filtros por categoría** (Interior, Exterior, Suculentas, etc.)
- **Integración WhatsApp** para pedidos
- **Animaciones suaves** y efectos visuales

### 🛠️ **Panel de Administración**
- **Sistema de login** seguro con sesiones
- **Gestión completa de productos** (CRUD)
- **Administración del carrusel hero**
- **Cambio entre imágenes externas/locales**
- **Interfaz intuitiva** con feedback visual
- **Responsive design** para móviles

### 🎨 **Características Técnicas**
- **HTML5, CSS3, JavaScript Vanilla**
- **Sin dependencias externas** (excepto Font Awesome)
- **Almacenamiento local** para configuración
- **Sistema modular** y escalable
- **Código limpio** y bien documentado

## 📁 Estructura del Proyecto

```
jj-vivero/
├── 📄 index.html              # Página principal
├── 🔐 admin.html              # Panel de administración
├── 🎨 styles.css              # Estilos principales
├── ⚡ script.js               # JavaScript principal
├── 🧪 test-productos.html     # Página de pruebas
├── 📋 ADMIN_CREDENTIALS.md    # Credenciales de admin
├── 📖 README.md               # Este archivo
├── 📂 config/
│   ├── 🖼️ images.js          # Configuración de imágenes
│   ├── 🌱 productos.js        # Base de datos de productos
│   └── 🔒 auth.js             # Configuración de autenticación
└── 📂 images/
    ├── 🏷️ LOGO.png            # Logo del vivero
    ├── 📝 README.md           # Guía de imágenes
    └── 🖼️ placeholder.svg     # Imagen de respaldo
```

## 🚀 Instalación y Uso

### 1. **Clonar el Repositorio**
```bash
git clone https://github.com/tu-usuario/jj-vivero.git
cd jj-vivero
```

### 2. **Abrir Localmente**
- Abre `index.html` en tu navegador para el sitio web
- Abre `admin.html` para el panel de administración

### 3. **Credenciales de Admin**
Consulta `ADMIN_CREDENTIALS.md` para las credenciales de acceso.

## 🎯 Funcionalidades Detalladas

### 🌐 **Sitio Web Principal**

#### 🖼️ **Carrusel Hero**
- 4 imágenes rotativas con transiciones suaves
- Controles de navegación (flechas e indicadores)
- Autoplay cada 5 segundos
- Pausa al hover
- Gestos táctiles en móviles

#### 🌱 **Catálogo de Plantas**
- **10 productos iniciales** en 6 categorías
- **Filtros dinámicos** por categoría
- **Búsqueda en tiempo real** por nombre, científico o descripción
- **Información completa**: precio, cuidados, descripción
- **Botón WhatsApp** con mensaje prellenado

#### 📱 **Responsive Design**
- Adaptado para móviles, tablets y desktop
- Grid CSS para layout flexible
- Menú adaptativo
- Imágenes optimizadas

### 🔧 **Panel de Administración**

#### 🔐 **Sistema de Login**
- Autenticación segura con múltiples usuarios
- Sesiones persistentes (4 horas)
- Logout seguro con confirmación
- Interfaz elegante con animaciones

#### 🌱 **Gestión de Productos**
- **Agregar plantas** con formulario completo
- **Editar productos** existentes
- **Eliminar productos** con confirmación
- **Vista previa** de cambios en tiempo real

#### 🖼️ **Gestión de Carrusel**
- **Administrar imágenes hero** individualmente
- **Cambiar posición** de slides
- **Vista previa** del carrusel
- **Restaurar imágenes** por defecto

#### ⚙️ **Configuración de Imágenes**
- **Toggle entre modos**: URLs externas vs archivos locales
- **Indicadores visuales** del modo activo
- **Instrucciones claras** para cada modo
- **Generación automática** de nombres de archivo

## 🎨 Personalización

### 🖼️ **Cambiar Imágenes**

#### **Modo Externo (URLs)**
1. Activa el modo externo en el admin
2. Usa URLs de Unsplash o tu servidor
3. Cambios inmediatos sin subir archivos

#### **Modo Local (Archivos)**
1. Activa el modo local en el admin
2. Sube archivos a la carpeta `images/`
3. Usa los nombres generados automáticamente

### 🎨 **Personalizar Colores**
Edita las variables CSS en `styles.css`:
```css
:root {
  --primary-green: #2f855a;
  --secondary-green: #38a169;
  --accent-orange: #ed8936;
}
```

### 🌱 **Agregar Productos**
1. Accede al panel admin
2. Usa el formulario "Agregar Nueva Planta"
3. Los filtros se actualizan automáticamente

## 🔒 Seguridad

### 🛡️ **Características de Seguridad**
- Credenciales no visibles en el código
- Sesiones con expiración automática
- Validación de formularios
- Confirmaciones para acciones críticas

### ⚠️ **Recomendaciones para Producción**
- Implementar autenticación del servidor
- Usar HTTPS obligatorio
- Hash de contraseñas
- Límites de intentos de login
- Tokens JWT

## 🌐 Despliegue

### 📋 **Preparación**
1. Todos los archivos están listos para despliegue
2. No requiere servidor backend
3. Compatible con hosting estático

### 🚀 **Opciones de Hosting**
- **GitHub Pages** (gratuito)
- **Netlify** (gratuito con dominio personalizado)
- **Vercel** (gratuito)
- **Cualquier hosting estático**

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Grid y Flexbox
- **JavaScript ES6+** - Funcionalidad interactiva
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografía (Poppins)
- **LocalStorage** - Persistencia de datos

## 📊 Estadísticas del Proyecto

- **Archivos**: 12 archivos principales
- **Líneas de código**: ~2,500 líneas
- **Productos iniciales**: 10 plantas
- **Categorías**: 6 categorías
- **Imágenes hero**: 4 slides
- **Usuarios admin**: 3 usuarios

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**JJ Vivero Team**
- Sitio Web: [jjvivero.com](https://jjvivero.com)
- Email: info@jjvivero.com

## 🙏 Agradecimientos

- **Unsplash** por las imágenes de alta calidad
- **Font Awesome** por los iconos
- **Google Fonts** por la tipografía
- **Comunidad de desarrolladores** por la inspiración

---

⭐ **¡Dale una estrella si te gusta el proyecto!** ⭐