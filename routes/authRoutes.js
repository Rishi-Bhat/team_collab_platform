const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

// This code defines an Express router for authentication routes.
// It imports the necessary modules and the authentication controller functions.
// The router handles POST requests for user registration and login by calling the respective controller functions.
// Finally, it exports the router for use in other parts of the application.
