const fs = require("fs");
const path = require("path");
const pool = require("../../config/database");

// Assuming you have a service called updateProfilePicture
const { updateProfilePicture, getUserDataByUserId } = require("./profile.service");

const handleUploadProfilePicture = async (req, res) => {
  console.log(req.file);

  try {

    const userId = req.body.userId;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    


    // Assuming you store uploaded images in an 'uploads' directory
    // const imagePath = path.join(__dirname, "..", "uploads", req.file.filename);
    const imagePath = req.file.filename;

    // Assuming you have access to the user's ID from the request (you need to adapt this based on your app's logic)
    // const userId = req.user.id; // Change this line according to your actual user ID retrieval logic


    console.log("Image Path:", req.file.filename); // Add this line to check imagePath
    console.log("User ID:", userId); // Add this line to check userId

    console.log("Request File:", req.file); // Add this line to check the uploaded file
    console.log("Request User:", req.user); // Add this line to check the user object

    // Update the user's profile picture URL in the database using the service

    await updateProfilePicture(userId, imagePath);

    const updatedUserData = await getUserDataByUserId(userId);

    return res
      .status(200)
      .json({ success: true, message: "Profile picture uploaded", user: updatedUserData});
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  handleUploadProfilePicture, // Export the function with the new name
};