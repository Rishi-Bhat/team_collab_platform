const Task = require("../models/Task");
const Board = require("../models/Board");
const Notification = require("../models/Notification");

// Create a new task
const createTask = async (req, res) => {
  const { title, description, boardId, assignedTo } = req.body;

  if (!title || !boardId) {
    return res
      .status(400)
      .json({ message: "Title and board ID are required." });
  }

  const board = await Board.findById(boardId);
  if (!board) return res.status(404).json({ message: "Board not found." });

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

  const io = req.app.get("io");
  io.to(boardId).emit("taskCreated", task);

  // Notify assignee
  if (assignedTo) {
    const notification = await Notification.create({
      recipient: assignedTo,
      type: "task-assigned",
      message: `You have been assigned a new task: ${title}`,
      link: `/tasks/${task._id}`,
    });

    io.to(assignedTo.toString()).emit(`notify:${assignedTo}`, notification);
  }

  res.status(201).json(task);
};

// Get all tasks for a board
const getBoardTasks = async (req, res) => {
  const { boardId } = req.params;

  const board = await Board.findById(boardId);
  if (!board) return res.status(404).json({ message: "Board not found." });

  if (!board.members.includes(req.user._id)) {
    return res.status(403).json({ message: "Not authorized to view tasks." });
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

  const task = await Task.findById(taskId);
  if (!task) return res.status(404).json({ message: "Task not found." });

  const board = await Board.findById(task.board);
  if (!board.members.includes(req.user._id)) {
    return res
      .status(403)
      .json({ message: "Not authorized to update this task." });
  }

  task.status = status;
  await task.save();

  const io = req.app.get("io");
  io.to(task.board.toString()).emit("taskUpdated", task);

  res.status(200).json({ message: "Task updated", task });
};

module.exports = { createTask, getBoardTasks, updateTaskStatus };
