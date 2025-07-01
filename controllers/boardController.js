const Board = require("../models/Board");

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

const deleteBoard = async (req, res) => {
  const board = req.board; // Assuming 'board' is set by the isAdminOnBoard middleware

  await Board.findByIdAndDelete(boardId);

  res.status(200).json({ message: "Board deleted successfully" });
};
// This file contains the controller functions for handling board-related operations.
// It includes functions to create a new board and retrieve boards associated with the authenticated user.
// The 'createBoard' function creates a new board with the provided name and associates it with the user.
// The 'getMyBoards' function retrieves all boards that the authenticated user is a member of, populating member details.

const User = require("../models/User");

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

module.exports = { createBoard, getMyBoards, addMemberToBoard, deleteBoard };
// This file defines the controller functions for board-related operations.
// It includes functions to create a new board, retrieve boards for the authenticated user, and add a member to a board.
// The 'addMemberToBoard' function checks if the user is authorized to add members and ensures the user exists before adding them to the board.
