const pool = require("../../config/database");

module.exports = {
  answerService: (data, callback) => {
    console.log("Answer Data:", data);
    pool.query(
      `INSERT INTO answer (answer, user_id, question_id, timestamp) VALUES (?, ?, ?, ?)`,
      [data.answer, data.user_id, data.question_id, data.timestamp],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  getUserIDByEmail: (email, callback) => {
    console.log(email)
    pool.query(
      "SELECT * FROM registration WHERE user_email = ?",
      [email],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        if (result.length === 0) {
          return callback(null, null); // User not found
        }
        return callback(null, result[0].user_id);
      }
    );
  },

  userById2: (id, callback) => {
    pool.query(
        `SELECT registration.user_id, registration.user_name, registration.user_email, answer.answer, answer.timestamp
        FROM registration
        LEFT JOIN answer ON registration.user_id = answer.user_id
        WHERE answer.question_id = ?`,
       
      [id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  

}