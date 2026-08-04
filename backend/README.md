# User Management API

A RESTful API built with **AdonisJS**, **TypeScript**, and **PostgreSQL** for managing users. The API uses **JWT authentication**, **VineJS validation**, and **Lucid ORM** to provide secure and reliable CRUD operations.

---

## Features

- Admin registration
- Admin login
- Admin logout
- Protected API routes
- User CRUD operations
- Request validation using VineJS
- Pagination
- Search
- Column-based sorting
- PostgreSQL database
- Lucid ORM

---

## Tech Stack

- AdonisJS
- TypeScript
- PostgreSQL
- Lucid ORM
- VineJS
- Access Tokens (Bearer Token)

---

## Project Structure

```text
app/
├── controllers/
├── middleware/
├── models/
├── validators/

config/

database/
├── migrations/
├── seeders/

start/
```

---

## Prerequisites

- Node.js
- PostgreSQL
- npm

---

## Environment Variables

Create a `.env` file in the project root.

```env
HOST=0.0.0.0
PORT=3333
NODE_ENV=development
APP_KEY=

DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_password
PG_DB_NAME=user_management
```

---

## Database Setup

Run migrations

```bash
node ace migration:run
```

Seed the database

```bash
node ace db:seed
```

Reset the database

```bash
node ace migration:refresh --seed
```

---

## Running the Server

Development

```bash
node ace serve --watch
```

---

## Authentication

The API uses **Bearer Token Authentication**.

### Register

```http
POST /auth/register
```

### Login

```http
POST /auth/login
```

Returns an access token.

Example:

```json
{
  "message": "Login successful",
  "token": "<access_token>"
}
```

Include the token in authenticated requests.

```http
Authorization: Bearer <access_token>
```

### Logout

```http
POST /auth/logout
```

---

## User Endpoints

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| GET    | `/users`     | Get all users    |
| GET    | `/users/:id` | Get a user by ID |
| POST   | `/users`     | Create a user    |
| PUT    | `/users/:id` | Update a user    |
| DELETE | `/users/:id` | Delete a user    |

---

## Query Parameters

### Pagination

```http
GET /users?page=1&limit=10
```

### Search

```http
GET /users?search=john
```

### Sorting

```http
GET /users?sortBy=first_name&order=asc
```

---

## Validation

All incoming requests are validated using **VineJS**.

Validation includes:

- Required fields
- Email format
- Email uniqueness
- Phone format
- Minimum and maximum lengths
- Alphabetic validation for names and locations

---

## Error Responses

### Validation Error

```json
{
  "errors": [
    {
      "field": "email",
      "message": "The email field must be a valid email address."
    }
  ]
}
```

### Unauthorized

```json
{
  "message": "Unauthorized"
}
```

### Not Found

```json
{
  "message": "User not found"
}
```

---

## Future Improvements

- Password reset

---

## Author

**Usama Mehmood**
