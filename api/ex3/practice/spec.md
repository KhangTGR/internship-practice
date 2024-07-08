# API Specification for `server.js`

This document provides an overview of the API endpoints available in the `server.js` application.

## Overview

The application is built with Express.js and provides endpoints for user authentication, OTP verification, starting and playing a number guessing game, and fetching user profiles. The application uses JWT for authentication and random strings for generating OTPs.

## Base URL

```
http://localhost:3000/api/v1
```

## Endpoints

### 1. Login

#### POST `/login`

Logs in a user and generates an OTP.

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "otp": "string"
}
```

**Error Response:**

```json
{
  "error": "Gõ sai username, password kìa :U"
}
```

### 2. Verify OTP

#### POST `/verify`

Verifies the OTP and returns a JWT token.

**Request Body:**

```json
{
  "username": "string",
  "password": "string",
  "otp": "string"
}
```

**Response:**

- Sets `Authorization` header with JWT token.
- Status 200 OK

**Error Response:**

```json
{
  "error": "Có đúng mã OTP không đó 😒"
}
```

### 3. Start Game

#### GET `/start`

Starts a new guessing game for the authenticated user.

**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Response:**

```json
{
  "message": "Oke, đoán đi :3"
}
```

**Error Response:**

- Status 401 Unauthorized
- Status 403 Forbidden

### 4. Guess Number

#### GET `/guess`

Makes a guess in the current game.

**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Query Parameters:**

```
number: integer
```

**Response:**

- If the guess is correct:

```json
{
  "result": "JUAN JUAN JUAN 💯",
  "attempts": "integer"
}
```

- If the guess is incorrect:

```json
{
  "result": "Caohondaitao" | "Behondaitao",
  "attempts": "integer"
}
```

**Error Response:**

```json
{
  "error": "Chưa bắt đầu đã đòi đoán à 😏"
}
```

### 5. User Profile

#### GET `/profile`

Fetches the profile and stats of the authenticated user.

**Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

**Response:**

```json
{
  "profile": {
    "name": "string",
    "age": "integer",
    "gender": "string"
  },
  "stats": {
    "totalGuesses": "integer",
    "correctGuesses": "integer",
    "successRate": "float"
  }
}
```

**Error Response:**

```json
{
  "error": "Mày là ai, sao tao không thấy mày trên hệ thông 🤨"
}
```

## Error Codes

- **400 Bad Request:** Invalid input or game state.
- **401 Unauthorized:** Missing or invalid JWT token.
- **403 Forbidden:** JWT token verification failed.
- **404 Not Found:** User not found.

## Authentication

- All endpoints except `/login` and `/verify` require a valid JWT token.
- Include the JWT token in the `Authorization` header as `Bearer <token>`.

## Running the Server

To start the server, run:

```bash
node server.js
```

The server will be running on `http://localhost:3000`.
