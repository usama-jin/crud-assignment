# User Management API Documentation

## Base URL

```http
http://localhost:3333
```

---

# Create User

Creates a new user.

## Endpoint

```http
POST /users
```

## Request Body

```json
{
  "firstName": "Usama",
  "lastName": "Mehmood",
  "email": "usama@example.com",
  "phone": "+923001234567",
  "address": "Street 12, G-10",
  "city": "Islamabad",
  "province": "Islamabad Capital Territory",
  "country": "Pakistan"
}
```

## Success Response

**Status:** `201 Created`


---

# Get Users

Returns a paginated list of users with searching and sorting support.

## Endpoint

```http
GET /users
```





```http
GET /users?page=2&limit=5
```

### Search users

```http
GET /users?search=usama
```

### Sort users

```http
GET /users?sortBy=first_name&order=asc
```

### Combined Example

```http
http://localhost:3333/users?limit=10&search=Lahore&sortBy=created_at&order=desc
```


---

# Update User (PUT)

Updates the complete user record.

## Endpoint

```http
PUT /users/:id
```

## Example

```http
PUT /users/1
```

## Request Body

```json
{
  "firstName": "Muhammad",
  "lastName": "Usama",
  "email": "m.usama@example.com",
  "phone": "+923111112222",
  "address": "House 45",
  "city": "Lahore",
  "province": "Punjab",
  "country": "Pakistan"
}
```


# Patch User (PATCH)

Updates only the fields provided in the request.

## Endpoint

```http
PATCH /users/:id
```

## Example

```http
PATCH /users/1
```

## Request Body

```json
{
  "city": "Karachi"
}
```

# Delete User

Deletes a user by ID.

## Endpoint

```http
DELETE /users/:id
```

## Example

```http
DELETE /users/1
```


---

# User Object

| Field | Type | Required |
|--------|------|----------|
| `id` | Integer | Auto-generated |
| `firstName` | String | Yes |
| `lastName` | String | Yes |
| `email` | String | Yes |
| `phone` | String | Yes |
| `address` | String | Yes |
| `city` | String | Yes |
| `province` | String | Yes |
| `country` | String | Yes |
| `createdAt` | DateTime | Auto-generated |
| `updatedAt` | DateTime | Auto-generated |

---

