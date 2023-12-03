const pool = require("../../config/database");
const nodemailer = require("nodemailer");


const User = {
  findByEmail: async function(email) {
    const [rows, fields] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0]; // Assuming you want to return the first matching user
  },
  // Other model methods
};

module.exports = User;


// Create a transporter object using your email provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: "Gmail", // Replace with your email service provider
  auth: {
    user: "anteneh.atre@gmail.com", // Your email address
    pass: "eopmuuyxmfbufauj", // Your email password(App password from google)
  },
});

// Function to send password reset email
async function sendPasswordResetEmail(email, resetToken) {
  const mailOptions = {
    from: "anteneh.atre@gmail.com", // Sender's email address
    to: email, // Recipient's email address
    subject: "Password Reset",
    html: `
      <p>You've requested a password reset. Click the link below to reset your password:</p>
      <a href="http://localhost:3000/reset?token=${resetToken}">Reset Password</a>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.response);
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
}

module.exports = { sendPasswordResetEmail };