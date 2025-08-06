# 🐙 Comandos Git para Despliegue

## 📋 Comandos Listos para Copiar y Pegar

### 1. **Inicializar y Subir a GitHub**

```bash
# Inicializar repositorio Git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "🌱 Initial commit: JJ Vivero website with admin panel

✨ Features:
- Modern responsive website with hero carousel
- Infinite product catalog with filters
- Complete admin panel with login system
- Image management (external/local modes)
- WhatsApp integration for orders
- Mobile-first design

🛠️ Tech Stack:
- HTML5, CSS3, JavaScript Vanilla
- Font Awesome icons
- Google Fonts (Poppins)
- LocalStorage for persistence

🚀 Ready for deployment on GitHub Pages and Netlify"

# Agregar repositorio remoto (REEMPLAZA TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/jj-vivero.git

# Subir código
git branch -M main
git push -u origin main
```

### 2. **Comandos para Actualizaciones Futuras**

```bash
# Ver estado de archivos
git status

# Agregar cambios específicos
git add archivo.html
# O agregar todos los cambios
git add .

# Hacer commit con mensaje descriptivo
git commit -m "✨ Add new plant category: Aromáticas"

# Subir cambios
git push origin main
```

### 3. **Comandos Útiles de Git**

```bash
# Ver historial de commits
git log --oneline

# Ver diferencias antes de commit
git diff

# Deshacer cambios no guardados
git checkout -- archivo.html

# Ver ramas
git branch

# Crear nueva rama para features
git checkout -b feature/nueva-funcionalidad

# Cambiar entre ramas
git checkout main
git checkout feature/nueva-funcionalidad

# Fusionar rama
git checkout main
git merge feature/nueva-funcionalidad
```

## 🌐 URLs de tu Proyecto

Una vez subido a GitHub, tus URLs serán:

### **GitHub Repository:**
```
https://github.com/TU-USUARIO/jj-vivero
```

### **GitHub Pages (después de activar):**
```
https://TU-USUARIO.github.io/jj-vivero/
```

### **Admin Panel:**
```
https://TU-USUARIO.github.io/jj-vivero/admin.html
```

## 📝 Plantilla de README para GitHub

Cuando crees el repositorio, puedes usar esta descripción:

```
🌱 Sitio web moderno para vivero con panel de administración completo

✨ Características:
• Catálogo infinito de plantas con filtros
• Carrusel hero con 4 imágenes rotativas  
• Panel admin con login seguro
• Gestión completa de productos (CRUD)
• Integración WhatsApp para pedidos
• Diseño responsive mobile-first
• Sistema de imágenes externas/locales

🛠️ Tech: HTML5, CSS3, JavaScript Vanilla
🚀 Deploy: GitHub Pages, Netlify ready
```

## 🏷️ Tags Sugeridos para GitHub

```
vivero, plantas, website, admin-panel, responsive, javascript, html5, css3, 
github-pages, netlify, whatsapp-integration, catalog, ecommerce, garden
```

## 🔄 Workflow de Desarrollo

### **Para cambios pequeños:**
```bash
git add .
git commit -m "🐛 Fix: Correct WhatsApp number format"
git push origin main
```

### **Para nuevas características:**
```bash
git checkout -b feature/payment-integration
# ... hacer cambios ...
git add .
git commit -m "✨ Add payment integration with PayPal"
git push origin feature/payment-integration
# Crear Pull Request en GitHub
```

### **Para correcciones urgentes:**
```bash
git checkout -b hotfix/admin-login-bug
# ... hacer corrección ...
git add .
git commit -m "🚨 Hotfix: Fix admin login validation"
git push origin hotfix/admin-login-bug
# Merge inmediato después de review
```

## 📊 Emojis para Commits

- ✨ `:sparkles:` - Nueva característica
- 🐛 `:bug:` - Corrección de bug
- 🎨 `:art:` - Mejora de UI/UX
- 🚀 `:rocket:` - Deploy/Performance
- 📝 `:memo:` - Documentación
- 🔒 `:lock:` - Seguridad
- 🌱 `:seedling:` - Contenido de plantas
- 🛠️ `:hammer_and_wrench:` - Configuración
- 📱 `:iphone:` - Responsive/Mobile
- 🔄 `:arrows_counterclockwise:` - Refactoring

## ⚠️ Antes del Primer Push

1. ✅ Ejecuta `verify-deployment.html` para verificar archivos
2. ✅ Revisa que `ADMIN_CREDENTIALS.md` esté en `.gitignore` si es necesario
3. ✅ Actualiza el número de WhatsApp en `script.js`
4. ✅ Personaliza colores y contenido si es necesario
5. ✅ Reemplaza "TU-USUARIO" con tu username real de GitHub

## 🎉 ¡Listo para el Lanzamiento!

Una vez ejecutados estos comandos, tu sitio estará:
- 📦 Subido a GitHub
- 🌐 Listo para GitHub Pages
- 🚀 Preparado para Netlify
- 📱 Optimizado para móviles
- 🔒 Con panel admin seguro

¡Tu vivero JJ Vivero estará en línea! 🌱✨