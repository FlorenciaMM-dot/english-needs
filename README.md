# English Needs

4-semana roadmap de preparación para entrevistas en inglés con sistema de estampas desbloqueables.

## Características

✅ Onboarding progresivo y hermoso  
✅ Sistema de 6 estampas (Mindset, CV, Visibility, English, Strategy, Interview)  
✅ Desbloqueo de estampas con código privado  
✅ Dashboard de progreso  
✅ Persistencia con localStorage  
✅ Mobile-first responsive design  
✅ Tailwind CSS + Lucide React icons  

## Stack

- React 18
- Tailwind CSS 3
- Lucide React (iconos)
- JavaScript puro (sin dependencias extras)

## Instalación Local

```bash
npm install
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Build para Producción

```bash
npm run build
```

## Deploy en Vercel

1. Pushea a GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/english-needs.git
git push -u origin main
```

2. Ve a [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Selecciona tu repo de GitHub
5. Click "Deploy" ✨

## Códigos de Prueba

Para probar en desarrollo:
- `DEMO` - Desbloquea Mindset + CV
- `MINDSET001` - Desbloquea Mindset
- `CV001` - Desbloquea CV
- `VISIBILITY001` - Desbloquea Visibility
- `ENGLISH001` - Desbloquea English
- `STRATEGY001` - Desbloquea Strategy
- `INTERVIEW001` - Desbloquea Interview

## Estructura

```
src/
├── index.js          # Entry point
├── index.css         # Tailwind + custom styles
├── App.js            # App component
├── EnglishNeeds.jsx  # Main app component
public/
├── index.html        # HTML template
tailwind.config.js    # Tailwind config
postcss.config.js     # PostCSS config
package.json          # Dependencies
.gitignore           # Git ignore
```

## Uso

1. **Onboarding**: Completa nombre, email, nivel e objetivo
2. **Dashboard**: Ve tu progreso en tiempo real
3. **Roadmap**: Navega por las 4 semanas
4. **Estampas**: Desbloquea con códigos privados
5. **Perfil**: Gestiona tu cuenta

## Datos Persistentes

Los datos se guardan en `localStorage` con estas claves:
- `englishneeds:profile` - Perfil del usuario
- `englishneeds:stamps` - Estampas desbloqueadas

## Personalización

Para cambiar colores, emojis o contenido, edita el objeto `stamps` en `src/EnglishNeeds.jsx`.

## Licencia

MIT
