const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addComment, getComments } = require("../controllers/commentController");

router.post("/", protect, addComment); // POST /api/comments
router.get("/:taskId", protect, getComments); // GET /api/comments/:taskId

module.exports = router;
// This code defines the routes for adding and retrieving comments on tasks.
// It uses Express.js to create a router, applies authentication middleware, and maps the routes to their respective controller functions.
