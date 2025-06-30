const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  createTask,
  getBoardTasks,
  updateTaskStatus,
} = require("../controllers/taskController");

// Create a new task
router.post("/", protect, createTask);

// Get all tasks for a board
router.get("/:boardId", protect, getBoardTasks);

// Update a task status
router.put("/:taskId/status", protect, updateTaskStatus);

module.exports = router;
