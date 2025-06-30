const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
// This code defines a Mongoose schema and model for comments in a task management application.
// The `Comment` model is used to store comments related to tasks, including the task ID, author ID, and the comment text.
