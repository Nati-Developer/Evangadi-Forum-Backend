const router = require("express").Router();
const { postAnswer, getUserByID } = require("./answer.controller");

router.post("/", postAnswer);
router.get("/:questionId", getUserByID);

module.exports = router;