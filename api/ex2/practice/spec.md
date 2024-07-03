## API Specification

### Overview

This document provides specifications for the login and verification APIs for a hypothetical authentication service. The APIs are designed to handle user login using phone numbers and OTP (One-Time Password) verification.

### Base URL

Assume the base URL for all endpoints is: `http://localhost:3000`

### Authentication

No authentication is required for accessing these APIs in this example scenario.

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
  - Login successful with valid OTP.

- **401 Unauthorized**
  ```json
  {
    "error": "Invalid OTP or phone number"
  }
  ```
  - Invalid OTP entered or phone number not found in the system.

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

{
  "message": "Login successful"
}
```
