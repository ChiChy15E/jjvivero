# 🚀 Guía de Despliegue - JJ Vivero

Esta guía te ayudará a lanzar tu sitio web de JJ Vivero en GitHub Pages y Netlify.

## 📋 Preparación Previa

### ✅ **Verificar Archivos**
Asegúrate de tener todos estos archivos en tu proyecto:
- `index.html` - Página principal
- `admin.html` - Panel de administración
- `styles.css` - Estilos
- `script.js` - JavaScript principal
- `config/` - Carpeta de configuración
- `images/` - Carpeta de imágenes
- `README.md` - Documentación
- `.gitignore` - Archivos a ignorar
- `netlify.toml` - Configuración de Netlify

## 🐙 Despliegue en GitHub Pages

### 1. **Crear Repositorio en GitHub**

1. Ve a [GitHub.com](https://github.com) e inicia sesión
2. Clic en "New repository" (botón verde)
3. Configura el repositorio:
   - **Repository name**: `jj-vivero` (o el nombre que prefieras)
   - **Description**: `Sitio web moderno para vivero con panel de administración`
   - **Public** (recomendado para GitHub Pages gratuito)
   - ✅ **Add a README file** (desmarca esto, ya tenemos README.md)
   - **Add .gitignore**: None (ya tenemos uno)
   - **Choose a license**: MIT (o desmarca, ya tenemos LICENSE)

4. Clic en "Create repository"

### 2. **Subir Código a GitHub**

Abre la terminal en la carpeta de tu proyecto y ejecuta:

```bash
# Inicializar repositorio Git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "🌱 Initial commit: JJ Vivero website with admin panel"

# Agregar el repositorio remoto (reemplaza TU-USUARIO con tu username)
git remote add origin https://github.com/TU-USUARIO/jj-vivero.git

# Subir código
git branch -M main
git push -u origin main
```

### 3. **Activar GitHub Pages**

1. Ve a tu repositorio en GitHub
2. Clic en "Settings" (pestaña)
3. Scroll hacia abajo hasta "Pages" (menú lateral)
4. En "Source", selecciona "Deploy from a branch"
5. En "Branch", selecciona "main" y "/ (root)"
6. Clic en "Save"
7. ✅ Tu sitio estará disponible en: `https://TU-USUARIO.github.io/jj-vivero`

### 4. **Configurar Dominio Personalizado (Opcional)**

Si tienes un dominio propio:
1. En la sección "Pages", agrega tu dominio en "Custom domain"
2. Configura los DNS de tu dominio para apuntar a GitHub Pages
3. ✅ Habilita "Enforce HTTPS"

## 🌐 Despliegue en Netlify

### 1. **Método 1: Desde GitHub (Recomendado)**

1. Ve a [Netlify.com](https://netlify.com) y crea una cuenta
2. Clic en "New site from Git"
3. Selecciona "GitHub" y autoriza Netlify
4. Selecciona tu repositorio `jj-vivero`
5. Configuración de build:
   - **Branch to deploy**: `main`
   - **Build command**: (dejar vacío)
   - **Publish directory**: (dejar vacío o poner `.`)
6. Clic en "Deploy site"
7. ✅ Tu sitio estará disponible en: `https://random-name.netlify.app`

### 2. **Método 2: Drag & Drop**

1. Ve a [Netlify.com](https://netlify.com)
2. Arrastra toda la carpeta del proyecto al área de "Deploy"
3. ✅ Sitio desplegado instantáneamente

### 3. **Configurar Dominio Personalizado en Netlify**

1. En tu dashboard de Netlify, clic en tu sitio
2. Ve a "Site settings" > "Domain management"
3. Clic en "Add custom domain"
4. Sigue las instrucciones para configurar DNS
5. ✅ Netlify proporciona SSL automático

## ⚙️ Configuraciones Post-Despliegue

### 🔒 **Seguridad del Admin**

**⚠️ IMPORTANTE**: El archivo `ADMIN_CREDENTIALS.md` contiene credenciales sensibles.

#### **Para GitHub Pages:**
1. Mueve `ADMIN_CREDENTIALS.md` fuera del repositorio
2. O agrégalo a `.gitignore` antes del primer commit

#### **Para Netlify:**
1. El archivo `netlify.toml` ya incluye headers de seguridad
2. El admin tendrá `X-Robots-Tag: noindex, nofollow`

### 🌐 **URLs de Acceso**

Una vez desplegado, tendrás estas URLs:

#### **GitHub Pages:**
- **Sitio principal**: `https://TU-USUARIO.github.io/jj-vivero/`
- **Panel admin**: `https://TU-USUARIO.github.io/jj-vivero/admin.html`

#### **Netlify:**
- **Sitio principal**: `https://tu-sitio.netlify.app/`
- **Panel admin**: `https://tu-sitio.netlify.app/admin` (sin .html)

### 📱 **Verificar Funcionalidad**

Después del despliegue, verifica:

1. ✅ **Sitio principal carga correctamente**
2. ✅ **Carrusel hero funciona**
3. ✅ **Filtros de productos funcionan**
4. ✅ **Búsqueda funciona**
5. ✅ **Botones WhatsApp funcionan**
6. ✅ **Panel admin es accesible**
7. ✅ **Login funciona con credenciales**
8. ✅ **Gestión de productos funciona**
9. ✅ **Responsive design en móviles**

## 🔄 Actualizaciones Futuras

### **Para GitHub Pages:**
```bash
# Hacer cambios en tu código local
git add .
git commit -m "✨ Descripción de los cambios"
git push origin main
# Los cambios se despliegan automáticamente
```

### **Para Netlify:**
- **Desde Git**: Los cambios se despliegan automáticamente al hacer push
- **Drag & Drop**: Arrastra la carpeta actualizada nuevamente

## 🛠️ Solución de Problemas

### **Problema: Sitio no carga**
- Verifica que `index.html` esté en la raíz
- Revisa la consola del navegador para errores

### **Problema: Admin no funciona**
- Verifica que todos los archivos de `config/` estén presentes
- Revisa las credenciales en `ADMIN_CREDENTIALS.md`

### **Problema: Imágenes no cargan**
- Verifica que las URLs de Unsplash sean correctas
- Revisa la configuración en `config/images.js`

### **Problema: WhatsApp no funciona**
- Actualiza el número de WhatsApp en `script.js` (línea ~140)
- Formato: código país + número sin espacios ni símbolos

## 📞 Soporte

Si tienes problemas con el despliegue:

1. **Revisa la documentación** de GitHub Pages o Netlify
2. **Verifica la consola** del navegador para errores
3. **Comprueba los logs** de despliegue en las plataformas
4. **Consulta este archivo** para configuraciones específicas

## 🎉 ¡Felicitaciones!

Una vez completado el despliegue, tendrás:

- ✅ **Sitio web profesional** en línea
- ✅ **Panel de administración** funcional
- ✅ **Dominio personalizado** (opcional)
- ✅ **SSL automático** habilitado
- ✅ **Actualizaciones automáticas** configuradas

¡Tu vivero JJ Vivero ya está en línea! 🌱🚀