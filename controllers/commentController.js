const Comment = require("../models/Comment");
const Task = require("../models/Task");
const Board = require("../models/Board");

//POST /api/comments
const addComment = async (req, res) => {
  const { taskId, text } = req.body;
  const userId = req.user._id;

  const task = await Task.findById(taskId).populate("board");
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  //Must be board member to add a comment
  const board = await Board.findById(task.board);
  if (!board.members.includes(userId)) {
    return res
      .status(403)
      .json({ message: "You are not a member of this board" });
  }

  const comment = await Comment.create({
    task: taskId,
    author: userId,
    text,
  });

  const io = req.app.get("io");
  io.to(task.board.toString()).emit("commentAdded", {
    taskId,
    text,
    author: req.user.name,
    createdAt: comment.createdAt,
  });

  res.status(201).json(comment);
};

//GET /api/comments/:taskId
const getComments = async (req, res) => {
  const taskId = req.params.taskId;

  const comments = await Comment.find({ task: taskId })
    .populate("author", "name")
    .sort({ createdAt: 1 });

  res.status(200).json(comments);
};

module.exports = { addComment, getComments };
