# Fase 1 - Arquitectura

## Objetivo
Construir una plataforma web para docentes y estudiantes donde la IA ayude a:

- generar actividades;
- crear exámenes;
- corregir respuestas;
- generar rúbricas;
- resumir documentos;
- crear material didáctico;
- administrar cursos.

## Stack recomendado

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Python
- Flask
- SQLAlchemy
- JWT
- Flask-Migrate

### Base de datos
- PostgreSQL

### IA
- OpenAI API

## Estructura inicial

- frontend/: aplicación React con Vite y Tailwind
- backend/: API Flask con SQLAlchemy, JWT y Flask-Migrate
- database/: configuración y scripts de base de datos
- docs/: documentación técnica

## Siguientes pasos
1. Crear autenticación con JWT.
2. Definir modelos de usuario, curso, examen y rúbrica.
3. Preparar endpoints de IA.
4. Conectar PostgreSQL con SQLAlchemy.
