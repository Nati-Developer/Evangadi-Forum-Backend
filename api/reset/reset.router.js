const router = require("express").Router();

const { requestPasswordReset, resetPassword } = require("./reset.controller");

router.post("/", requestPasswordReset);
router.post("/pass", resetPassword);

module.exports = router;
