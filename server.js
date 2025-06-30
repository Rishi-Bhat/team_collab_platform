const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "*", // For testing purposes, you can set the origin to "*"
    methods: ["GET", "POST"],
  },
});

app.set("io", io); // Make the io instance available in the app

const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// Middleware to parse JSON bodies
// This is necessary for handling requests that send JSON data, such as POST requests with user data.
app.use(express.json());

// This is the main entry point of the application.
// It sets up the Express server, connects to MongoDB, and defines routes for the application.
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Connecting to MongoDB using Mongoose
// The connection string is stored in the environment variable MONGO_URI.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Importing the authentication routes and using them in the application
// This allows the application to handle user authentication, such as login and registration.
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Importing the board routes and using them in the application
// This allows the application to handle requests related to boards, such as creating and retrieving boards.
const boardRoutes = require("./routes/boardRoutes");
app.use("/api/boards", boardRoutes);

// Importing the task routes and using them in the application
// This allows the application to handle requests related to tasks, such as creating and updating tasks.
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

// Importing the comment routes and using them in the application
// This allows the application to handle requests related to comments on tasks, such as adding and retrieving
const commentRoutes = require("./routes/commentRoutes");
app.use("/api/comments", commentRoutes);

//Socket.io events
io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);
  // Handle user joining a board
  socket.on("joinBoard", (boardId) => {
    socket.join(boardId);
    console.log(`Socket ${socket.id} joined board ${boardId}`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  // Handle custom events here
  // Example: socket.on("event_name", (data) => { ... });
});

// Setting up the server to listen on a specified port
// The PORT is defined in the environment variables or defaults to 5000 if not specified.
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
