# Internship Project – Authentication System

This project is a full-stack authentication system built as task for internship. It uses **NestJS** for the backend and **React (TypeScript)** for the frontend. The system includes user authentication, email verification, password reset functionality, and token-based security.

---

## 🚀 Tech Stack

### Backend
- NestJS (Node.js framework)
- PostgreSQL (Database)
- Redis (Caching / token storage)
- SMTP (Email service for verification & password reset)
- JWT Authentication

### Frontend
- React
- TypeScript
- RTK
- React Router

---

## 📦 Features

- User Registration
- User Login
- Email Verification
- Forgot Password
- Reset Password
- Secure Authentication with JWT
- Redis-based token/session handling
- SMTP email integration

---

## 🔐 API Endpoints

### 🟢 Auth Module

---

### ✨ Register a new user
**POST** `/auth/register`

Creates a new user account and sends an email verification link via SMTP.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
### ✨ Login user
**POST** `/auth/login`

Logs in user - creates session and token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword",
  "fingerprint": "fingerprint"
}
```

**Response**
```json
{
    "token": "token"
}
```

### ✨ Verify user user
**POST** `/auth/verify`

Verifies user and creates session and token.

**Request Body:**
```json
{
  "token": "token",
  "fingerprint": "fingerprint"
}
```

**Response**
```json
{
    "token": "token"
}
```

### ✨ Forgot password
**POST** `/auth/forgot-password`

Sends reset-password url to email.

**Request Body:**
```json
{
  "email": "user@example.com",
}
```

### ✨ Reset password
**POST** `/auth/reset-password`

Sets new password.

**Request Body:**
```json
{
  "token": "token",
  "newPassword": "newPassword"
}
```

### 🟢 Users Module

---

### ✨ Get me
**POST** `/users/me`

Sets new password.

**Response:**
```json
{
  "email": "email"
}
```

