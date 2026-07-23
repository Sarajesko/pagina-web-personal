-- Datos iniciales — ejecutar tras schema.sql
-- sqlite3 portfolio.db < seed.sql

INSERT INTO projects (title, description, stack, github_url, image_url, is_featured, sort_order, is_published)
VALUES
(
    'Cinebook',
    'Catálogo de libros de cine: inventario, ISBN, wishlist y estadísticas. Demo: https://cinebook-o4t3.onrender.com',
    'Angular,NestJS,TypeScript',
    'https://github.com/Sarajesko/Cinebook',
    '',
    1,
    1,
    1
),
(
    'rag-agent-azure',
    'API FastAPI con agente RAG, Azure SQL, Docker y despliegue en Azure Container Apps con CI/CD.',
    'Python,FastAPI,Azure,Docker',
    'https://github.com/Sarajesko/rag-agent-azure',
    '',
    1,
    2,
    1
),
(
    'Manga-festival-Web',
    'Mini sitio del Festival Manga Core 2026: HTML, CSS y JavaScript con reserva de bono validada.',
    'HTML,CSS,JavaScript',
    'https://github.com/Sarajesko/Manga-festival-Web',
    '',
    0,
    3,
    1
),
(
    'cinemateca-yugoslav-black-wave',
    'Cinemateca de la Ola Negra Yugoslava: catálogo editorial, Next.js + Fastify + PostgreSQL.',
    'TypeScript,Next.js,Fastify',
    'https://github.com/Sarajesko/cinemateca-yugoslav-black-wave',
    '',
    0,
    4,
    1
),
(
    'social-content-generator-api',
    'API FastAPI para posts con MySQL y generación de contenido con Azure OpenAI.',
    'Python,FastAPI,Azure,MySQL',
    'https://github.com/Sarajesko/social-content-generator-api',
    '',
    0,
    5,
    1
),
(
    'task-manager-api',
    'API REST de tareas con FastAPI, CRUD, endpoints de IA con Azure OpenAI y tests con pytest.',
    'Python,FastAPI,Azure,pytest',
    'https://github.com/Sarajesko/task-manager-api',
    '',
    0,
    6,
    1
);
