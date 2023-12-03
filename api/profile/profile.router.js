const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const { handleUploadProfilePicture } = require("./profile.controller");
// router.post("/", handleUploadProfilePicture);

// Set up the multer middleware for file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });


// Define the route and attach the middleware and controller function
router.post("/", upload.single("profilePicture"), handleUploadProfilePicture);

module.exports = router;