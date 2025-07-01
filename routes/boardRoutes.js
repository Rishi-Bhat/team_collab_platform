const express = require("express");
const router = express.Router();
const isAdminOnBoard = require("../middleware/isAdminOnBoard");

const { protect } = require("../middleware/authMiddleware");
const {
  createBoard,
  getMyBoards,
  addMemberToBoard,
  deleteBoard,
  updateUserRoleOnBoard,
} = require("../controllers/boardController");

// Route to create a new board
router.post("/", protect, createBoard);

// Route to get all boards for the authenticated user
router.get("/", protect, getMyBoards);

// Route to add a member to a board
router.post("/add-member", protect, addMemberToBoard);

// Route to delete a board
router.delete("/:boardid", protect, isAdminOnBoard, deleteBoard);

// Route to update a user's role on a board
router.patch("/:boardId/roles", protect, isAdminOnBoard, updateUserRoleOnBoard);

module.exports = router;
// This file defines the routes for board-related operations.
// It includes routes for creating a board, retrieving user boards, adding members, deleting a board, and updating user roles on a board.
// The routes are protected by authentication middleware, and some require admin access on the board.
// The `isAdminOnBoard` middleware checks if the user has admin privileges on the specified board before allowing access to certain routes.
// The routes are organized under the `/boards` path, and each route corresponds to a specific controller function that handles the request logic.
// The `protect` middleware ensures that only authenticated users can access these routes, while the `isAdminOnBoard` middleware ensures that only users with admin privileges can perform certain actions, such as deleting a board or updating user roles.
