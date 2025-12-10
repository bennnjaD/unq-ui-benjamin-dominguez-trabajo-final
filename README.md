# Preguntados - UNQ UI

Aplicación web de trivia interactiva desarrollada con React y Vite.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js 20.x** o superior
- **npm** (incluido con Node.js)

### Verificar versión de Node.js

```bash
node --version
```

Si no tienes Node.js 20 o necesitas actualizarlo, descárgalo desde [nodejs.org](https://nodejs.org/)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/bennnjaD/unq-ui-benjamin-dominguez-trabajo-final.git
```

### 2. Instalar dependencias

#### En Linux/MacOS:

```bash
npm install
```

#### En Windows (CMD):

```cmd
npm install
```

#### En Windows (PowerShell):

```powershell
npm install
```

## 💻 Ejecutar el Proyecto Localmente

### Modo Desarrollo

#### En Linux/MacOS:

```bash
npm run dev
```

#### En Windows (CMD):

```cmd
npm run dev
```

#### En Windows (PowerShell):

```powershell
npm run dev
```

Una vez ejecutado, la aplicación estará disponible en:

```
http://localhost:5173
```

## 🛠️ Tecnologías Utilizadas

- **React** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite** - Herramienta de construcción y desarrollo rápido
- **TypeScript** - Superset tipado de JavaScript

## 🐛 Solución de Problemas

### Error al instalar dependencias

Si encuentras errores durante `npm install`:

```bash
# Limpia la caché de npm
npm cache clean --force

# Elimina node_modules y package-lock.json
rm -rf node_modules package-lock.json  # Linux/MacOS
# o
rmdir /s node_modules & del package-lock.json  # Windows CMD

# Vuelve a instalar
npm install
```

### Puerto 5173 ya en uso

Si el puerto está ocupado, Vite automáticamente usará el siguiente disponible (5174, 5175, etc.)

## 📄 Licencia

Este proyecto fue desarrollado como trabajo final para la materia de Construcción de Interfaces de Usuario - UNQ.

## 👤 Autor

**Benjamín Domínguez**

---
