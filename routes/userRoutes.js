const express = require('express');
const { registerUser, loginUser, currentUser, deleteUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');    
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

router.delete("/delete-user", validateToken, deleteUser);

module.exports = router;