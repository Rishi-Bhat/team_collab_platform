# 🧩 TeamCollab Platform – Backend

A powerful backend API built with **Node.js, Express, MongoDB, and Socket.IO** for real-time team collaboration. Features include user authentication, board/task management, task status updates, commenting, and live updates via WebSockets.

> 🔒 Secure • ⚡ Fast • 💬 Real-Time • 🌱 Scalable

---

## 🚀 Features

- ✅ User registration & login with JWT
- 📋 Create and manage boards
- 👥 Add members to boards
- 📝 Create, update, and assign tasks
- 🗨️ Comment on tasks
- 🔄 Real-time task updates with Socket.IO
- 🔐 Route protection via middleware
- 📦 Clean folder structure for scalability

---

## 🛠️ Tech Stack

| Layer        | Tools Used           |
| ------------ | -------------------- |
| Backend      | Node.js, Express.js  |
| Database     | MongoDB, Mongoose    |
| Real-time    | Socket.IO            |
| Auth         | JWT (JSON Web Token) |
| Testing/API  | Postman              |
| Version Ctrl | Git & GitHub         |

---

## 📁 Folder Structure

```
team-collab-backend/
│
├── controllers/       → Route logic (auth, boards, tasks, comments)
├── middleware/        → Auth protection middleware
├── models/            → Mongoose schemas (User, Board, Task, Comment)
├── routes/            → Express routes
├── .env               → Env vars (Mongo URI, JWT secret, etc.)
├── server.js          → App entry point + Socket.IO config
```

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites

- Node.js & npm
- MongoDB Atlas account
- Git

### 🧩 Install & Run

1. **Clone the repo**

   ```bash
   git clone git@github.com:Rishi-Bhat/team_collab_platform.git
   cd team_collab_platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file**

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. **Run the app**
   ```bash
   npm run dev
   ```

> The server runs at: `http://localhost:5000`

---

## 📡 Real-Time Events

| Event          | Triggered When                     |
| -------------- | ---------------------------------- |
| `joinBoard`    | A user joins a board’s socket room |
| `taskCreated`  | A task is created on a board       |
| `taskUpdated`  | Task status is updated             |
| `commentAdded` | A new comment is added to a task   |

---

## 📬 Sample API Endpoints

### 👤 Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`

### 📋 Boards

- `POST /api/boards` – Create board
- `GET /api/boards` – Get user boards

### 🧠 Tasks

- `POST /api/tasks` – Create task
- `GET /api/tasks/:boardId` – Get board tasks
- `PUT /api/tasks/:taskId/status` – Update task status

### 💬 Comments

- `POST /api/comments` – Add comment
- `GET /api/comments/:taskId` – Get comments for a task

---

## ✅ Todos / In Progress

- [ ] Add role-based permissions
- [ ] Add due dates & notifications
- [ ] Frontend in React (coming soon)
- [ ] Unit tests with Jest

---

## 📸 Screenshots (coming soon)

> You'll see sample API requests, responses, and socket logs here once the frontend is connected.

---

## 🧑‍💻 Author

**Rishi Bhat**  
[GitHub](https://github.com/Rishi-Bhat)

---

> 💡 _Want to contribute, suggest features, or report bugs? Open an issue or pull request. Thanks!_
