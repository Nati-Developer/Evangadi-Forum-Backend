
const pool = require('../../config/database');

const updateProfilePicture = async (userId, imagePath) => {
  try {
    console.log("Update Profile Picture - User ID:", userId); // Add this line to check userId
    console.log("Update Profile Picture - Image Path:", imagePath); // Add this line to check imagePath

    const query = 'UPDATE profile SET profile_picture = ? WHERE user_id = ?';
    const values = [imagePath, userId];
    
    await pool.query(query, values);
  } catch (error) {
    throw new Error('Error updating profile picture in the database');
  }
};


// Function to get user data by userId
const getUserDataByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM profile WHERE user_id = ?";
    pool.query(query, [userId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      if (results.length > 0) {
        resolve(results[0]); // Return the first row (assuming user_id is unique)
      } else {
        resolve(null); // No user found with the given userId
      }
    });
  });
};

module.exports = {
    updateProfilePicture,
  getUserDataByUserId,
};
