const Board = require("../models/Board");

const isAdminOnBoard = async (req, res, next) => {
  const boardId = req.params.boardId || req.body.boardId;

  const board = await Board.findById(boardId);
  if (!board) return res.status(404).json({ message: "Board not found" });

  const userRole = board.roles.get(req.user._id.toString());

  if (!userRole !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }

  req.board = board; // Pass board to the next middleware or controller
  next();
};

module.exports = isAdminOnBoard;
