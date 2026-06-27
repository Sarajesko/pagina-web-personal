# Backend — Flask + SQLite

API REST para formulario de contacto, proyectos públicos y panel administrador.

## Endpoints previstos (v1)

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/contact` | No | Guardar mensaje en BD |
| GET | `/api/projects` | No | Listar proyectos (público) |
| POST | `/api/admin/login` | No | Login administrador |
| GET | `/api/admin/messages` | Sí | Listar mensajes contacto |
| POST | `/api/admin/projects` | Sí | Crear proyecto |
| PUT | `/api/admin/projects/:id` | Sí | Editar proyecto |
| DELETE | `/api/admin/projects/:id` | Sí | Eliminar proyecto |

## Base de datos

SQLite — tablas: `contact_messages`, `projects`, `admin_users`.

Ver `schema.sql` (pendiente, paso 6.1).

## Configuración

Copiar `.env.example` → `.env` (pendiente, paso 6.10).
