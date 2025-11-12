# API SPECIFICATION

## DATABASE MODELS

```prisma
model User {
  id              Int      @id @default(autoincrement())
  email           String   @unique
  name            String?
  password        String
  role            String   @default("USER")
  isEmailVerified Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  Token           Token[]
}

model Token {
  id          Int       @id @default(autoincrement())
  token       String
  type        String
  expires     DateTime
  blacklisted Boolean
  createdAt   DateTime  @default(now())
  user        User      @relation(fields: [userId], references: [id])
  userId      Int
}
```

## AUTHENTICATION ENDPOINTS

---

EP: POST /auth/register
DESC: Register a new user account.
IN: body:{email:str!, password:str!, name:str}
OUT: 201:{user:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}, tokens:{access:{token:str, expires:str}, refresh:{token:str, expires:str}}}
ERR: {"400":"Invalid input or email already exists", "422":"Validation error", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/register -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"password123","name":"John Doe"}'
EX_RES_201: {"user":{"id":1,"email":"user@example.com","name":"John Doe","role":"USER","isEmailVerified":false,"createdAt":"2025-11-12T10:30:00Z","updatedAt":"2025-11-12T10:30:00Z"},"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIs...","expires":"2025-11-12T11:30:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIs...","expires":"2025-11-19T10:30:00Z"}}}

---

EP: POST /auth/login
DESC: Authenticate user with email and password.
IN: body:{email:str!, password:str!}
OUT: 200:{user:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}, tokens:{access:{token:str, expires:str}, refresh:{token:str, expires:str}}}
ERR: {"401":"Invalid email or password", "400":"Validation error", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/login -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"password123"}'
EX_RES_200: {"user":{"id":1,"email":"user@example.com","name":"John Doe","role":"USER","isEmailVerified":false,"createdAt":"2025-11-12T10:30:00Z","updatedAt":"2025-11-12T10:30:00Z"},"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIs...","expires":"2025-11-12T11:30:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIs...","expires":"2025-11-19T10:30:00Z"}}}

---

EP: POST /auth/logout
DESC: Logout user by invalidating refresh token.
IN: body:{refreshToken:str!}
OUT: 204:{}
ERR: {"404":"Token not found", "401":"Invalid token", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/logout -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIs..."}'
EX_RES_204: {}

---

EP: POST /auth/refresh-tokens
DESC: Refresh authentication tokens using refresh token.
IN: body:{refreshToken:str!}
OUT: 200:{access:{token:str, expires:str}, refresh:{token:str, expires:str}}
ERR: {"401":"Invalid or expired refresh token", "404":"Token not found", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/refresh-tokens -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIs..."}'
EX_RES_200: {"access":{"token":"eyJhbGciOiJIUzI1NiIs...","expires":"2025-11-12T11:30:00Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIs...","expires":"2025-11-19T10:30:00Z"}}

---

EP: POST /auth/forgot-password
DESC: Send password reset email to user.
IN: body:{email:str!}
OUT: 204:{}
ERR: {"404":"User not found with this email", "400":"Invalid email format", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/forgot-password -H "Content-Type: application/json" -d '{"email":"user@example.com"}'
EX_RES_204: {}

---

EP: POST /auth/reset-password
DESC: Reset user password using reset token.
IN: query:{token:str!}, body:{password:str!}
OUT: 204:{}
ERR: {"401":"Invalid or expired token", "400":"Invalid password format", "500":"Internal server error"}
EX_REQ: curl -X POST "/auth/reset-password?token=resetToken123" -H "Content-Type: application/json" -d '{"password":"newPassword123"}'
EX_RES_204: {}

---

EP: POST /auth/send-verification-email
DESC: Send email verification to authenticated user.
IN: headers:{Authorization:str!}
OUT: 204:{}
ERR: {"401":"Unauthorized", "429":"Too many requests", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/send-verification-email -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
EX_RES_204: {}

---

EP: POST /auth/verify-email
DESC: Verify user email using verification token.
IN: query:{token:str!}
OUT: 204:{}
ERR: {"401":"Invalid or expired token", "400":"Bad request", "500":"Internal server error"}
EX_REQ: curl -X POST "/auth/verify-email?token=verifyToken123"
EX_RES_204: {}

## USER MANAGEMENT ENDPOINTS

---

EP: POST /users
DESC: Create a new user (admin only).
IN: headers:{Authorization:str!}, body:{name:str!, email:str!, password:str!, role:str!}
OUT: 201:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Invalid input or email already exists", "401":"Unauthorized", "403":"Forbidden", "500":"Internal server error"}
EX_REQ: curl -X POST /users -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." -H "Content-Type: application/json" -d '{"name":"Jane Smith","email":"jane@example.com","password":"password123","role":"USER"}'
EX_RES_201: {"id":2,"email":"jane@example.com","name":"Jane Smith","role":"USER","isEmailVerified":false,"createdAt":"2025-11-12T10:45:00Z","updatedAt":"2025-11-12T10:45:00Z"}

---

EP: GET /users
DESC: Get paginated list of users with optional filtering.
IN: headers:{Authorization:str!}, query:{name:str, role:str, sortBy:str, limit:int, page:int}
OUT: 200:{results:arr[{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}], page:int, limit:int, totalPages:int, totalResults:int}
ERR: {"401":"Unauthorized", "403":"Forbidden", "500":"Internal server error"}
EX_REQ: curl -X GET "/users?page=1&limit=10&role=USER" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
EX_RES_200: {"results":[{"id":1,"email":"user@example.com","name":"John Doe","role":"USER","isEmailVerified":false,"createdAt":"2025-11-12T10:30:00Z","updatedAt":"2025-11-12T10:30:00Z"}],"page":1,"limit":10,"totalPages":1,"totalResults":1}

---

EP: GET /users/{userId}
DESC: Get specific user by ID.
IN: headers:{Authorization:str!}, params:{userId:int!}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"401":"Unauthorized", "403":"Forbidden", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X GET /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
EX_RES_200: {"id":1,"email":"user@example.com","name":"John Doe","role":"USER","isEmailVerified":false,"createdAt":"2025-11-12T10:30:00Z","updatedAt":"2025-11-12T10:30:00Z"}

---

EP: PATCH /users/{userId}
DESC: Update user information.
IN: headers:{Authorization:str!}, params:{userId:int!}, body:{name:str, email:str, password:str}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Invalid input or email already exists", "401":"Unauthorized", "403":"Forbidden", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X PATCH /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." -H "Content-Type: application/json" -d '{"name":"John Updated"}'
EX_RES_200: {"id":1,"email":"user@example.com","name":"John Updated","role":"USER","isEmailVerified":false,"createdAt":"2025-11-12T10:30:00Z","updatedAt":"2025-11-12T11:00:00Z"}

---

EP: DELETE /users/{userId}
DESC: Delete user account.
IN: headers:{Authorization:str!}, params:{userId:int!}
OUT: 200:{}
ERR: {"401":"Unauthorized", "403":"Forbidden", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X DELETE /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
EX_RES_200: {}

## DASHBOARD ENDPOINTS

---

EP: GET /dashboard/stats
DESC: Get dashboard statistics for authenticated user.
IN: headers:{Authorization:str!}
OUT: 200:{totalUsers:int, activeUsers:int, totalRevenue:float, conversionRate:float, percentChanges:{users:float, revenue:float, conversionRate:float}}
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X GET /dashboard/stats -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
EX_RES_200: {"totalUsers":12543,"activeUsers":8432,"totalRevenue":123456.78,"conversionRate":3.24,"percentChanges":{"users":12.5,"revenue":8.3,"conversionRate":-2.1}}

---

EP: GET /dashboard/recent-activity
DESC: Get recent activity feed for authenticated user.
IN: headers:{Authorization:str!}
OUT: 200:arr[{id:str, type:str, description:str, timestamp:str, user:str}]
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X GET /dashboard/recent-activity -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
EX_RES_200: [{"id":"1","type":"user_registered","description":"New user registration","timestamp":"2025-11-12T10:15:00Z","user":"Alice Johnson"},{"id":"2","type":"payment_completed","description":"Payment processed successfully","timestamp":"2025-11-12T10:00:00Z","user":"Bob Wilson"}]