# Sistema de Inventario

Sistema de gestión de inventario orientado a pequeñas y medianas empresas.
Permite administrar productos, marcas, tipos de producto y estados, con una
arquitectura desacoplada y desplegable en entornos locales (on-premise).

## Características
- API REST para gestión de inventario
- Interfaz web para administración
- Arquitectura backend / frontend desacoplada
- Despliegue mediante Docker y Docker Compose
- Preparado para entornos de red local

## Tecnologías
- Backend: Django + Django REST Framework
- Frontend: React
- Servidor web: Nginx
- Contenedores: Docker / Docker Compose

## Requisitos
- Docker
- Docker Compose

## Instalación (entorno local)
Clonar el repositorio y ejecutar:

```bash
docker-compose up --build
