const express = require("express");
const router = express.Router();
const isAdminOnBoard = require("../middleware/isAdminOnBoard");

const { protect } = require("../middleware/authMiddleware");
const {
  createBoard,
  getMyBoards,
  addMemberToBoard,
  deleteBoard,
} = require("../controllers/boardController");

// Route to create a new board
router.post("/", protect, createBoard);

// Route to get all boards for the authenticated user
router.get("/", protect, getMyBoards);

// Route to add a member to a board
router.post("/add-member", protect, addMemberToBoard);

// Route to delete a board
router.delete("/:boardid", protect, isAdminOnBoard, deleteBoard);

module.exports = router;
// This file defines the routes for board-related operations.
// It uses the Express router to handle requests for creating and retrieving boards.
// The 'protect' middleware ensures that only authenticated users can access these routes.
