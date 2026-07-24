# Deploy en Hetzner (recomendado)

Una sola URL: **Caddy (HTTPS) → FastAPI** sirve portfolio + API + admin. SQLite en volumen Docker (los mensajes no se pierden al redesplegar).

## 1. Crear el VPS

1. Cuenta en [hetzner.com/cloud](https://www.hetzner.com/cloud)
2. **New project** → **Add server**
3. Recomendado:
   - **Location:** Falkenstein (fsn1) o Nuremberg (nbg1)
   - **Image:** Ubuntu 24.04
   - **Type:** **CAX11** (ARM, ~€3.79/mes) o **CX22** (x86, ~€4.5/mes)
   - **SSH key:** añade la tuya (obligatorio; desactiva login por password si puedes)
4. Firewall (Cloud Firewall o ufw): abre **22**, **80**, **443**
5. Anota la **IPv4** pública

## 2. Dominio (recomendado)

Apunta un registro **A** a la IP del VPS, p. ej. `portfolio.tudominio.com`.  
Sin dominio puedes arrancar con `SITE_ADDRESS=:80` (solo HTTP) y añadir dominio después.

## 3. En el servidor

```bash
ssh root@TU_IP

apt update && apt upgrade -y
curl -fsSL https://get.docker.com | sh

git clone https://github.com/Sarajesko/pagina-web-personal.git
cd pagina-web-personal

cp deploy/env.example .env
nano .env   # SITE_ADDRESS, SECRET_KEY, ADMIN_*, CORS_ORIGINS
```

> El servicio `api` carga credenciales **solo** desde el fichero `.env` (`env_file`). No dependas de variables exportadas en el shell del servidor: pueden pisar valores y dejar un admin con password distinto al del `.env`.

Generar `SECRET_KEY`:

```bash
openssl rand -hex 32
```

Arrancar:

```bash
chmod +x deploy/bootstrap.sh
./deploy/bootstrap.sh
# o: docker compose up -d --build
```

## 4. URLs

| Qué | URL |
|-----|-----|
| Portfolio | `https://TU_DOMINIO/frontend/` |
| Admin | `https://TU_DOMINIO/frontend/admin/` |
| Health | `https://TU_DOMINIO/api/health` |

## 5. Actualizar (código nuevo)

```bash
cd ~/pagina-web-personal   # o la ruta donde clonaste
git pull
docker compose up -d --build
```

Los mensajes quedan en el volumen `portfolio_data`.

## Variables clave (`.env`)

| Variable | Con dominio | Solo IP |
|----------|-------------|---------|
| `SITE_ADDRESS` | `portfolio.tudominio.com` | `:80` |
| `CORS_ORIGINS` | `https://portfolio.tudominio.com` | `http://IP` |
| `SESSION_HTTPS_ONLY` | `true` | `false` |
| `SESSION_SAME_SITE` | `lax` | `lax` |

## Notas

- Plan Always Free de Render **no** aplica aquí: el VPS no se duerme.
- No subas `.env` a Git.
- Cambia `ADMIN_PASSWORD` respecto a cualquier valor de ejemplo o de `render.yaml`.
