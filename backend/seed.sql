-- Datos iniciales — ejecutar tras schema.sql
-- sqlite3 portfolio.db < seed.sql

INSERT INTO projects (title, description, stack, github_url, image_url, is_featured, sort_order, is_published)
VALUES
(
    'Manga-festival-Web',
    'Web para festival de manga: validación de datos y navegación multipágina.',
    'HTML,CSS,JavaScript',
    'https://github.com/Sarajesko/Manga-festival-Web',
    '../assets/projects/manga-festival.png',
    1,
    1,
    1
),
(
    'Validación PHP',
    'Ejercicio de validación de formularios en PHP.',
    'PHP',
    'https://github.com/Sarajesko/Validaci-n-PHP',
    '../assets/projects/validacion-php.png',
    0,
    2,
    1
),
(
    'EV Pablo García',
    'Ejercicio de validación — entrega evaluable DAW.',
    'PHP',
    'https://github.com/Sarajesko/EV_Pablo_GarciaMarquez',
    '../assets/projects/ev-pablo.png',
    0,
    3,
    1
);

-- Usuario admin: crear con init_db.py usando ADMIN_USERNAME / ADMIN_PASSWORD del .env
