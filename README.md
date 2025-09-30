https://little-lemmon-yeinier.netlify.app/
## 🍽️ Little Lemon Restaurant App

A simple React-based frontend simulation of a restaurant website for Little Lemon, a Mediterranean-themed restaurant. The site features a reservation form, weekly specials, menu highlights, testimonials, and responsive layout for mobile and desktop.

## 📌 Description

This project originally simulated a full restaurant reservation and ordering experience only on the frontend. It now includes a real backend (Node.js + Express + MySQL) for persistent table availability and reservation storage.

## ✨ Features

### Frontend
- 🏠 Home page with hero / highlights
- 🗓️ Reservation workflow (find table → choose slot → select indoor/outdoor → enter details)
- 🔄 Dynamic hour suggestions (±30/60 min alrededor del horario elegido)
- 🎨 Custom CSS (glass / gradients) + responsive layout

### Backend (Nuevo / Real)
- 📦 Mesas persistentes (`tables`)
- 🧾 Reservas reales (`reservations`)
- 🔍 Búsqueda de disponibilidad basada en SQL (filtro por capacidad + verificación de no solapamiento)
- 🕒 Sugerencias de horarios cercanos (±30/60min)
- ⛔ Prevención de solapamientos usando rangos con `duration_minutes`
- ✅ Inserción transaccional eligiendo mesa de menor tamaño disponible (first-fit)
- 🛡️ Validaciones robustas (nombre, email, date window ≤90 días, slots cada 30 min, location)
- 👩‍💻 Página Admin para listar reservas por fecha y filtrar por ubicación

### Tecnología
- React 18 / Create React App
- Express 4 + MySQL (mysql2 / pool)
- Sin ORM, consultas parametrizadas

## 🚀 Getting Started (Frontend Only Simulation)
```
git clone https://github.com/Yeinier22/Little-Lemon.git
cd little-lemon
npm install
npm start
```

The app will run on http://localhost:3000.

## �️ Backend (Real Reservations)

### 1. Crear Base de Datos
```sql
CREATE DATABASE little_lemon;
USE little_lemon;
-- Ejecutar contenido de server/db/schema.sql
-- Luego server/db/seed.sql
```

### 2. Configurar Variables
Copiar `server/.env.example` a `server/.env` y ajustar:
```
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=little_lemon
DB_PORT=3306
PORT=5001
```

### 3. Instalar Dependencias Backend
```bash
cd server
npm install
npm run dev
```
El backend quedará en: http://localhost:5001/api

### 4. Variables Frontend (opcional si cambias puerto)
Crear `.env` en raíz:
```
REACT_APP_API_BASE=http://localhost:5001/api
```

### 5. Ejecutar Frontend
```bash
npm start
```

### 6. Endpoints Clave
```
GET /api/health
GET /api/availability?date=YYYY-MM-DD&time=HH:MM&people=N
GET /api/availability/suggestions?date=YYYY-MM-DD&time=HH:MM&people=N
POST /api/reservations { name,email,people,date,time,location }
```

### 7. Ejemplo de Reserva
```bash
curl -X POST http://localhost:5001/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "people":2,
    "date":"2025-09-30",
    "time":"14:00",
    "location":"inside"
  }'
```

### 8. Lógica de Selección de Mesa
Se elige la mesa libre de menor capacidad que soporte el número de personas (first-fit ordenado por seats ASC).

### 9. Características Avanzadas Añadidas
- Duración de reserva configurable (env: `RESERVATION_DURATION_MIN`, default 90)
- Evita solapamientos (intervalo A solapa B si startA < endB AND endA > startB)
- Admin route: `/admin/reservations` (activar/desactivar con `REACT_APP_SHOW_ADMIN=false`)
- Endpoint listado admite `?location=inside|outside`
- Validación backend responde 422 con `{ errors: [ {field,message} ] }`

### 10. Próximas Extensiones (Ideas Futuras)
- Cancelaciones / soft-delete
- Autenticación (JWT) para admin
- Export CSV / paginación
- Rate limiting y logging estructurado
- Tests integrados (supertest + jest)

�📁 Project Structure
```
/src
  ├── Components         # Reusable UI components
  ├── Styles             # CSS files
  ├── images             # Project assets
  ├── Test               # Reservation logic and subcomponents
  ├── App.js
  ├── HomePage.js
  └── index.js
```
## 🧪 Validaciones Backend

| Campo | Regla |
|-------|-------|
| name | 2–100 chars, letras/espacios/apóstrofos |- 
| email | Regex simple RFC-lite |
| people | 1–20 |
| date | >= hoy y ≤ hoy+90 días |
| time | HH:MM (minutos 00 o 30) |
| location | inside / outside |
| duration_minutes | 30–240 (opcional) |

Respuestas inválidas: `422 { errors: [ { field, message } ] }`.

## 🛠 Scripts de Desarrollo

| Script | Descripción |
|--------|-------------|
| `npm run start` | Frontend CRA |
| `npm run dev:full` | Front + API simultáneos |
| `npm --prefix server run dev` | Sólo backend |

## 🐳 Docker Compose

Archivo: `docker-compose.yml`

Servicios:
```
db (MySQL 8)
api (Express)
web (Frontend build sobre Nginx)
```
Levantar:
```
docker compose up --build
```
Accesos:
```
Frontend: http://localhost:3000
API:      http://localhost:5001/api
MySQL:    localhost:3307  (user: lemon / pass: lemonpass)
```

Variables personalizables en servicio api: `RESERVATION_DURATION_MIN`, DB_*.

## 🧪 Notes

- Si no levantas el backend, la UI mostrará error de disponibilidad al intentar buscar mesas.
- La lógica simulada anterior fue marcada como deprecated (`Ocuppancy.js`, `Booking.js`).
- El estado local refleja la reserva recién creada para continuar el flujo sin refetch inmediato.
- Para ocultar Admin: añadir en `.env` del frontend: `REACT_APP_SHOW_ADMIN=false`.

📷 Screenshots

Include screenshots showing:

![preview](Home.jpg)

![preview](Testimonials.jpg)

![preview](BookTable.png)


📚 Credits

Design inspired by the Meta Front-End Capstone project (Coursera). All images used are for demo purposes only.
