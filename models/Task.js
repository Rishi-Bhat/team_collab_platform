const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

// This code defines a Mongoose schema for a Task model in a project management application.
// Each task has a title, an optional description, a status (which can be 'To Do', 'In Progress', or 'Done'),
// an optional reference to a user it is assigned to, and a reference to the board it belongs to.
// The schema also includes timestamps for creation and updates.
