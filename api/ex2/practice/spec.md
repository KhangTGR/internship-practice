## API Specification

### Overview

This document provides specifications for the login, verification, and profile APIs for a hypothetical authentication service. The APIs are designed to handle user login using phone numbers and OTP (One-Time Password) verification, as well as retrieving user profile information.

### Base URL

Assume the base URL for all endpoints is: `http://localhost:3000`

### Authentication

The `/profile` endpoint requires authentication using a JWT token, which is provided after successful OTP verification.

### Error Handling

Standard HTTP status codes and JSON response bodies are used for error handling.

---

### 1. `/login`

#### Endpoint

```
POST /login
```

#### Description

Initiates the login process by validating the provided phone number and returning a randomly generated OTP if the phone number is registered.

#### Request Body

```json
{
  "phoneNumber": "string"
}
```

- **phoneNumber** (string, required): The phone number of the user attempting to log in.

#### Responses

- **200 OK**
  ```json
  {
    "otp": "string"
  }
  ```
  - **otp** (string): The generated OTP for the provided phone number.

- **401 Unauthorized**
  ```json
  {
    "error": "Phone number not registered"
  }
  ```
  - The provided phone number is not registered in the system.

---

### 2. `/verify`

#### Endpoint

```
POST /verify
```

#### Description

Verifies the OTP provided by the user against the OTP generated earlier for the given phone number.

#### Request Body

```json
{
  "phoneNumber": "string",
  "otp": "string"
}
```

- **phoneNumber** (string, required): The phone number for which OTP verification is being performed.
- **otp** (string, required): The OTP entered by the user for verification.

#### Responses

- **200 OK**
  ```json
  {
    "message": "Login successful"
  }
  ```
  - Login successful with valid OTP. The JWT token is returned in the `Authorization` header.
  ```
  Authorization: Bearer <jwt_token>
  ```

- **401 Unauthorized**
  ```json
  {
    "error": "Invalid OTP or phone number"
  }
  ```
  - Invalid OTP entered or phone number not found in the system.

---

### 3. `/profile`

#### Endpoint

```
GET /profile
```

#### Description

Retrieves the profile information of the logged-in user. Requires a valid JWT token.

#### Request Headers

```
Authorization: Bearer <jwt_token>
```

- **Authorization** (string, required): The JWT token received after successful OTP verification.

#### Responses

- **200 OK**
  ```json
  {
    "phoneNumber": "string",
    "name": "string",
    "email": "string"
  }
  ```
  - **phoneNumber** (string): The phone number of the user.
  - **name** (string): The name of the user.
  - **email** (string): The email of the user.

- **401 Unauthorized**
  ```json
  {
    "error": "Unauthorized"
  }
  ```
  - JWT token is missing or invalid.

- **403 Forbidden**
  ```json
  {
    "error": "Forbidden"
  }
  ```
  - JWT token is valid but access is forbidden.

- **404 Not Found**
  ```json
  {
    "error": "User not found"
  }
  ```
  - User profile not found for the given JWT token.

---

### Example Usage

#### Request

```
POST /login
Content-Type: application/json

{
  "phoneNumber": "1234567890"
}
```

#### Response

```
200 OK
Content-Type: application/json

{
  "otp": "123456"
}
```

---

#### Request

```
POST /verify
Content-Type: application/json

{
  "phoneNumber": "1234567890",
  "otp": "123456"
}
```

#### Response

```
200 OK
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "message": "Login successful"
}
```

---

#### Request

```
GET /profile
Authorization: Bearer <jwt_token>
```

#### Response

```
200 OK
Content-Type: application/json

{
  "phoneNumber": "1234567890",
  "name": "John Doe",
  "email": "john@example.com"
}
```

This specification now includes the necessary details for the `/profile` endpoint, including authentication requirements and expected responses.