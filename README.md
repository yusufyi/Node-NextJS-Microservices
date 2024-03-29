# Microservices Project

This project consists of multiple microservices built using Node.js and Express.js.

## Authentication Service (auth-service)

### Overview

The authentication service (`auth-service`) provides endpoints for user authentication and token generation using JSON Web Tokens (JWT).

### Setup

1. Clone the repository.
2. Navigate to the `auth-service` directory.
3. Install dependencies using `npm install`.
4. Start the service using `npm start`.

### API Endpoints

- **POST /login**: Authenticates users with their username and password and generates a JWT token.

### Usage Examples

1. **Login**
   ```bash
   curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username": "user1", "password": "password1"}'
   ```
