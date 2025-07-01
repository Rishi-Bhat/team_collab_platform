const Board = require("../models/Board");
const User = require("../models/User");

// This function creates a new board.
// It checks if the user has provided a name for the board and creates a new board with
const createBoard = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Please add a name" });

  const board = await Board.create({
    name,
    createdBy: req.user._id,
    members: [req.user._id],
    roles: {
      [req.user._id]: "admin", // Assigning the creator as an admin
    },
  });

  res.status(201).json(board);
};

const getMyBoards = async (req, res) => {
  const boards = await Board.find({
    members: req.user._id,
  }).populate("members", "name email");

  res.status(200).json(boards);
};

// This function adds a member to a board.
// It checks if the board exists, verifies that the user is the creator of the board,
const addMemberToBoard = async (req, res) => {
  const { boardId, userEmail } = req.body;

  if (!boardId || !userEmail) {
    return res
      .status(400)
      .json({ message: "Board ID and user email are required" });
  }

  const board = await Board.findById(boardId);
  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  if (board.createdBy.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Only the board creator can add members" });
  }

  const userToAdd = await User.findOne({ email: userEmail });
  if (!userToAdd) {
    return res.status(404).json({ message: "User not found" });
  }

  if (board.members.includes(userToAdd._id)) {
    return res
      .status(400)
      .json({ message: "User is already a member of this board" });
  }

  board.members.push(userToAdd._id);
  await board.save();

  res.status(200).json({ message: "Member added successfully", board });
};

// This function deletes a board by its ID.
// It first checks if the user is an admin on the board using the isAdminOnBoard
const deleteBoard = async (req, res) => {
  const board = req.board; // Assuming 'board' is set by the isAdminOnBoard middleware

  await Board.findByIdAndDelete(boardId);

  res.status(200).json({ message: "Board deleted successfully" });
};

// This function updates a user's role on a board.
// It checks if the user exists, verifies that the requester is an admin on the board,
const updateUserRoleOnBoard = async (req, res) => {
  const { boardId } = req.params;
  const { userId, newRole } = req.body;

  if (!userId || !newRole) {
    return res
      .status(400)
      .json({ message: "User ID and new role are required" });
  }

  if (!["admin", "member"].includes(newRole)) {
    return res.status(400).json({ message: "Invalid role specified" });
  }

  const board = await Board.findById(boardId);
  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  const requesterRole = board.roles.get(req.user._id.toString());
  if (requesterRole !== "admin") {
    return res
      .status(403)
      .json({ message: "Only admins can update user roles" });
  }

  if (!board.members.includes(userId)) {
    return res.status(404).json({ message: "User not found in this board" });
  }

  if (userId === req.user._id.toString()) {
    return res.status(400).json({ message: "You cannot change your own role" });
  }

  board.roles.set(userId, newRole);
  await board.save();

  res.status(200).json({ message: `User role updated to ${newRole}`, board });
};

module.exports = {
  createBoard,
  getMyBoards,
  addMemberToBoard,
  deleteBoard,
  updateUserRoleOnBoard,
};

// This file defines the controller functions for board-related operations.
// It includes functions for creating a board, retrieving user boards, adding members, deleting a board, and updating user roles on a board.
// Each function interacts with the Board and User models to perform the necessary database operations.
// The functions also handle various error cases, such as missing parameters or unauthorized access.
