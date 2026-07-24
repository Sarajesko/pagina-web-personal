#!/usr/bin/env bash
# Primer arranque en el VPS (Ubuntu). Ejecutar desde la raíz del repo clonado.
set -euo pipefail

if [[ ! -f .env ]]; then
  echo "Falta .env — copia deploy/env.example y ajústalo:"
  echo "  cp deploy/env.example .env && nano .env"
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "Instala Docker primero (ver deploy/hetzner.md)."
  exit 1
fi

docker compose up -d --build
docker compose ps
echo ""
echo "Health: curl -sS http://127.0.0.1/api/health  (o https://tu-dominio/api/health)"
echo "Web:    /frontend/   Admin: /frontend/admin/"
