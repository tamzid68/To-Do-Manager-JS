# To-Do Manager JS

A simple Node.js backend API for managing user authentication and to-dos using JWT and file-based storage.

---

## 🚀 How to Run

1. **Install dependencies:**
   ```
   npm install
   ```

2. **Create a `.env` file** in the project root:
   ```
   JWT_SECRET=your_super_secret_key
   ```

3. **Start the server:**
   ```
   node app.js
   ```
   The server will run on [http://localhost:3000](http://localhost:3000).

---

## 📝 How to Use

### 1. **Register a new user**
   - **Endpoint:** `POST /api/auth/signup`
   - **Body:**  
     ```json
     {
       "username": "testuser",
       "password": "testpass123"
     }
     ```

### 2. **Login**
   - **Endpoint:** `POST /api/auth/login`
   - **Body:**  
     ```json
     {
       "username": "testuser",
       "password": "testpass123"
     }
     ```
   - **Response:**  
     Returns a JWT token. Use this token as a Bearer token in the `Authorization` header for all to-do endpoints.

### 3. **To-Do Endpoints**
   - **Get all to-dos:**  
     `GET /api/todo/get`
   - **Add a to-do:**  
     `POST /api/todo/set`  
     Body: `{ "text": "Your task" }`
   - **Update a to-do:**  
     `PUT /api/todo/:id`  
     Body: `{ "text": "Updated task", "completed": true }`
   - **Delete a to-do:**  
     `DELETE /api/todo/:id`

   All to-do endpoints require the JWT token in the `Authorization` header:
   ```
   Authorization: Bearer <your_token>
   ```

### 4. **Logout**
   - **Endpoint:** `POST /api/auth/logout`
   - Requires JWT token in the header.
   - Deletes all your to-dos and logs you out.

---

## 👤 Test User

You can register your own user, or use this sample for testing:

**Sample `users.json`:**
```json
[
  {
    "id": "sample-user-id",
    "username": "testuser",
    "password": "$2b$10$examplehashedpassword"
  }
]
```
> (Register via `/api/auth/signup` to generate a real hashed password.)

**Sample `todos.json`:**
```json
[
  {
    "id": "sample-todo-id",
    "userId": "sample-user-id",
    "text": "Sample task",
    "completed": false,
    "createdAt": "2025-06-20T00:00:00.000Z"
  }
]
```

---

## 📄 Notes

- All data is stored in `data/users.json` and `data/todos.json`.
- Do **not** commit your `.env` or data files with real user data.
- For security, always use a strong `JWT_SECRET` in production.

---

**Enjoy building with To-Do Manager JS!**

---

## 📦 Dependencies

This project uses the following npm packages:

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **dotenv**: Module to load environment variables from a `.env` file.
- **bcrypt**: A library to help you hash passwords.
- **jsonwebtoken**: JSON Web Token implementation for Node.js.
- **uuid**: Generate RFC4122 UUIDs.
- **body-parser**: Node.js body parsing middleware.