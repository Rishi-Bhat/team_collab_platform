const Task = require("../models/Task");
const Board = require("../models/Board");

// Create a new task
const createTask = async (req, res) => {
  const { title, description, boardId, assignedTo } = req.body;

  if (!title || !boardId) {
    return res
      .status(400)
      .json({ message: "Title and board ID are required." });
  }

  // Check if the board exists
  const board = await Board.findById(boardId);
  if (!board) return res.status(404).json({ message: "Board not found." });

  //check if the user is authorized to create a task on this board
  if (!board.members.includes(req.user._id)) {
    return res.status(403).json({
      message: "You are not authorized to create a task on this board.",
    });
  }

  const task = await Task.create({
    title,
    description,
    board: boardId,
    assignedTo,
  });

  // Emit an event to notify other users about the new task
  const io = req.app.get("io");
  io.to(boardId).emit("taskCreated", task);

  res.status(201).json(task);
};

// Get all tasks for a board
const getBoardTasks = async (req, res) => {
  const { boardId } = req.params;

  // Check if the board exists
  const board = await Board.findById(boardId);
  if (!board) return res.status(404).json({ message: "Board not found." });
  // Check if the user is authorized to view tasks on this board
  if (!board.members.includes(req.user._id)) {
    return res
      .status(403)
      .json({ message: "You are not authorized to view tasks on this board." });
  }

  const tasks = await Task.find({ board: boardId }).populate(
    "assignedTo",
    "name email"
  );
  res.status(200).json(tasks);
};

// Update a task status
const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required." });
  }

  // Check if the task exists
  const task = await Task.findById(taskId);
  if (!task) return res.status(404).json({ message: "Task not found." });

  // Check if the user is authorized to update this task
  const board = await Board.findById(task.board);
  if (!board.members.includes(req.user._id)) {
    return res
      .status(403)
      .json({ message: "You are not authorized to update this task." });
  }

  task.status = status || task.status; // Update status if provided, otherwise keep the current status
  await task.save();

  // Emit an event to notify other users about the task status update
  const io = req.app.get("io");
  io.to(task.board.toString()).emit("taskUpdated", task);

  res.status(200).json({ message: "Task status updated successfully.", task });
};

module.exports = { createTask, getBoardTasks, updateTaskStatus };
// This code defines a task controller for a project management application.
// It includes functions to create a new task, get all tasks for a specific board, and update the status of a task.
// Each function checks for required fields, verifies the existence of the board and task,
// and ensures that the user is authorized to perform the action based on their membership in the board.
