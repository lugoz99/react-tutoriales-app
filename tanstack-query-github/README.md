# GitHub Issues - TanStack Query

Repositorio del proyecto del curso sobre TanStack Query con React

## Dev

1. Clonar repositorio
2. Instalar dependencias `npm install`
3. Iniciar servidor de desarrollo `npm run dev`

## Tecnologías usadas

- React
- TanStack Query
- TailwindCSS
- React Router 6+
- React Icons


| Paso | Comando | Qué hace |
|------|---------|----------|
| 1 | `git checkout --orphan nombre-rama` | Crea nueva rama independiente |
| 2 | `git rm -rf .` | Limpia el área de preparación |
| 3 | `git add carpeta-proyecto/*` | Agrega solo esa carpeta |
| 4 | `git commit -m "Descripción del proyecto"` | Guarda los cambios |
| 5 | `git push origin nombre-rama` | Sube la rama a GitHub |
```

**Ejemplo real:**
```
git checkout --orphan hero-app
git rm -rf .
git add hero-app/*
git commit -m "Proyecto hero-app"
git push origin hero-app

| Acción                   | Comando                                   |
| ------------------------ | ----------------------------------------- |
| Ir a la rama             | `git checkout tanstack-query-issues-main` |
| Ver cambios              | `git status`                              |
| Guardar cambios          | `git add .`                               |
| Commit                   | `git commit -m "Describe el cambio"`      |
| Subir cambios            | `git push`                                |
| Volver a main (opcional) | `git checkout main`                       |
