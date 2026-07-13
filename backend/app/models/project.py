import sqlite3


def count(db: sqlite3.Connection) -> int:
    row = db.execute("SELECT COUNT(*) AS n FROM projects").fetchone()
    return int(row["n"])


def list_published(db: sqlite3.Connection) -> list[sqlite3.Row]:
    return db.execute(
        """
        SELECT id, title, description, stack, github_url, image_url,
               is_featured, sort_order, is_published, created_at, updated_at
        FROM projects
        WHERE is_published = 1
        ORDER BY sort_order ASC, id ASC
        """
    ).fetchall()


def list_all(db: sqlite3.Connection) -> list[sqlite3.Row]:
    return db.execute(
        """
        SELECT id, title, description, stack, github_url, image_url,
               is_featured, sort_order, is_published, created_at, updated_at
        FROM projects
        ORDER BY sort_order ASC, id ASC
        """
    ).fetchall()


def get_by_id(db: sqlite3.Connection, project_id: int) -> sqlite3.Row | None:
    return db.execute(
        "SELECT * FROM projects WHERE id = ?",
        (project_id,),
    ).fetchone()


def create(
    db: sqlite3.Connection,
    *,
    title: str,
    description: str,
    stack: str,
    github_url: str,
    image_url: str | None = None,
    is_featured: bool = False,
    sort_order: int = 0,
    is_published: bool = True,
) -> int:
    cursor = db.execute(
        """
        INSERT INTO projects (
            title, description, stack, github_url, image_url,
            is_featured, sort_order, is_published
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            title,
            description,
            stack,
            github_url,
            image_url,
            1 if is_featured else 0,
            sort_order,
            1 if is_published else 0,
        ),
    )
    db.commit()
    return int(cursor.lastrowid)


def update(
    db: sqlite3.Connection,
    project_id: int,
    *,
    title: str,
    description: str,
    stack: str,
    github_url: str,
    image_url: str | None,
    is_featured: bool,
    sort_order: int,
    is_published: bool,
) -> bool:
    cursor = db.execute(
        """
        UPDATE projects
        SET title = ?, description = ?, stack = ?, github_url = ?, image_url = ?,
            is_featured = ?, sort_order = ?, is_published = ?,
            updated_at = datetime('now')
        WHERE id = ?
        """,
        (
            title,
            description,
            stack,
            github_url,
            image_url,
            1 if is_featured else 0,
            sort_order,
            1 if is_published else 0,
            project_id,
        ),
    )
    db.commit()
    return cursor.rowcount > 0


def delete(db: sqlite3.Connection, project_id: int) -> bool:
    cursor = db.execute("DELETE FROM projects WHERE id = ?", (project_id,))
    db.commit()
    return cursor.rowcount > 0
