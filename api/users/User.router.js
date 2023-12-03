const router = require('express').Router();

//importing auth middleware
// const auth = require('../middleware/auth');


const { createUser, getUserById, getUsers, login } = require('./User.control');

//route new user to be registered using createUser controller
router.post("/", createUser);
router.get("/all", getUsers);

// Uncomment the line below to use the auth middleware
// router.get("/", auth, getUserById);

router.post("/login", login);

module.exports = router;