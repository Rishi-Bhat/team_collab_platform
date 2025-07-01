const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["task-assigned", "comment"], // Add more types as needed
      required: true,
    },
    message: String,
    link: String, // URL to redirect when the notification is clicked
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;

// This model defines the structure of a notification in the database.
// It includes fields for the recipient, type of notification, message, link, and read status.
