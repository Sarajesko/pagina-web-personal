-- Portfolio Pablo García Márquez — SQLite schema (v1)
-- Motor: SQLite 3
-- Uso: sqlite3 portfolio.db < schema.sql

PRAGMA foreign_keys = ON;

-- Mensajes del formulario de contacto (API pública INSERT)
CREATE TABLE IF NOT EXISTS contact_messages (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    email       TEXT    NOT NULL,
    subject     TEXT    NOT NULL,
    message     TEXT    NOT NULL,
    is_read     INTEGER NOT NULL DEFAULT 0 CHECK (is_read IN (0, 1)),
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
    ON contact_messages (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read
    ON contact_messages (is_read);

-- Proyectos del portfolio (lectura pública; escritura solo admin)
CREATE TABLE IF NOT EXISTS projects (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL,
    description TEXT    NOT NULL,
    stack       TEXT    NOT NULL DEFAULT '',
    github_url  TEXT    NOT NULL,
    image_url   TEXT,
    is_featured INTEGER NOT NULL DEFAULT 0 CHECK (is_featured IN (0, 1)),
    sort_order  INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 1 CHECK (is_published IN (0, 1)),
    created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_projects_published_order
    ON projects (is_published, sort_order ASC, id ASC);

-- Administrador (login panel admin; password_hash = werkzeug/bcrypt)
CREATE TABLE IF NOT EXISTS admin_users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT    NOT NULL UNIQUE,
    password_hash TEXT    NOT NULL,
    created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);
