# User Management System

A full-stack User Management System built with **AdonisJS**, **React**, **Vite**, **TypeScript**, and **PostgreSQL**. The application provides secure JWT authentication and a complete CRUD interface for managing users.

---

## Features

### Authentication

- Admin login
- Admin registration
- Protected routes
- Logout

### User Management

- Create user
- View users
- Edit user
- Delete user
- View user details

### Search & Sorting

- Search users
- Column-based sorting
- Pagination

### Validation

- Frontend validation
- Backend validation (VineJS)
- Friendly validation messages

### UI

- Tabler Admin Template
- Responsive layout
- Confirmation dialogs
- Success/Error dialog boxes

---

## Tech Stack

### Backend

- AdonisJS
- TypeScript
- PostgreSQL
- Lucid ORM
- VineJS Validation

### Frontend

- React
- TypeScript
- Vite
- Axios
- React Router
- Tabler UI

---

## Project Structure

```
backend/
frontend/
```

---

## Installation

### Clone repository

```bash
git clone https://github.com/usama-jin/crud-assignment.git
```

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the backend.

Example:

```env
# Node
TZ=UTC
PORT=3333
HOST=localhost
NODE_ENV=development

# App
LOG_LEVEL=info
APP_KEY=QjVZoGPN3hU9nxrKg_s1bLgLuQwtC6zJ
APP_URL=http://${HOST}:${PORT}

# Session
SESSION_DRIVER=cookie
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=

```

---

## Database

Run migrations

```bash
node ace migration:run
```

Seed data

```bash
node ace db:seed
```

---

## Start Backend

```bash
node ace serve --watch
```

---

## Start Frontend

```bash
npm run dev
```

---

## Authentication

After login, a access token is issued.

The frontend stores the token in Local Storage and automatically includes it in every authenticated request.

---

## API Features

- Authentication
- User CRUD
- Pagination
- Search
- Sorting
- Validation

---

## Future Improvements

- Profile management
- Dark mode

---

## Author

Usama Mehmood
