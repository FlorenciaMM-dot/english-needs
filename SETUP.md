# Setup English Needs en GitHub + Vercel

## Requisitos

- Node.js 16+ instalado
- Cuenta en GitHub
- Cuenta en Vercel (gratis)

## Paso 1: Preparar código local

```bash
cd /Users/florencia/Documents/Claude/Projects/Skool

# Instalar dependencias
npm install

# Probar localmente
npm start
```

Debería abrirse en http://localhost:3000

Testa:
- Onboarding (completa los 4 pasos)
- Ingresa código DEMO
- Navega por tabs
- Prueba logout

## Paso 2: Pushear a GitHub

```bash
cd /Users/florencia/Documents/Claude/Projects/Skool

git init
git add .
git commit -m "Initial commit: English Needs app"
git branch -M main
git remote add origin https://github.com/FlorenciaMM-dot/english-needs.git
git push -u origin main
```

Verifica en github.com/FlorenciaMM-dot/english-needs que el código está ahí.

## Paso 3: Deploy en Vercel

1. Ve a https://vercel.com/new
2. Click "Import Project"
3. Pega: `https://github.com/FlorenciaMM-dot/english-needs`
4. Click "Continue"
5. Project name: `english-needs`
6. Framework: "Create React App" (auto-detectado)
7. Click "Deploy"

Espera 2-3 minutos.

## Listo! 🎉

Tu app estará en: `https://english-needs.vercel.app`

(O con tu dominio si lo conectas)

## Updates futuros

Cada vez que hagas cambios:

```bash
git add .
git commit -m "tu mensaje"
git push
```

Vercel auto-deploya en 1 minuto.

## Troubleshooting

Si algo falla:

1. Check logs en Vercel dashboard
2. Verifica que `package.json` tiene las dependencias
3. Corre `npm install` nuevamente
4. Prueba `npm run build` local

## Contacto

Para soporte o cambios: florenciamariana907@gmail.com
