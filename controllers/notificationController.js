const Notification = require("../models/Notification");

//GET /api/notifications
const getNotifications = async (req, res) => {
  const notifications = await Notification.find({
    recipient: req.user._id,
  }).sort({ createdAt: -1 });

  res.json(notifications);
};

//PATCH /api/notifications/:id/read
const markAsRead = async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  // Check if the notification exists and if the user is authorized to read it
  // Assuming `recipient` is an array of user IDs who can read the notification
  if (!notification || notification.recipient.findById(req.user._id)) {
    return res
      .status(404)
      .json({ message: "Notification not found or unauthorized." });
  }
  notification.read = true;
  await notification.save();

  res.json({ success: true });
};

module.exports = {
  getNotifications,
  markAsRead,
};
// This controller handles fetching notifications for the user and marking them as read.
// It uses the Notification model to interact with the database and returns the results in JSON format.
