const pool = require("../../config/database");
const {
  answerService,
  getUserIDByEmail,
  userById2,
} = require("./answer.service");

module.exports = {
  postAnswer: (req, res) => {
    const { answer, email, question_id } = req.body;

    console.table(req.body);
    // Validate the incoming data
    if (!answer) {
      return res
        .status(400)
        .json({ msg: "Not Answer fields have been provided" });
    }

    getUserIDByEmail(email, (err, user_id) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Error fetching user_id" });
      }

      if (!user_id) {
        return res.status(404).json({ msg: "User not found" });
      }

      const currentTime = new Date();

      const answerData = {
        answer,
        user_id,
        question_id,
        timestamp: currentTime,
      };
      // Insert the answer into the database
      answerService(answerData, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "database connection err" });
        }
        return res.status(200).json({
          msg: "question added successfully",
          results,
        });
      });
    });
  },

  getUserByID: (req, res) => {
    const { questionId } = req.params;
    userById2(questionId, (err, results) => {
      console.log(req.id);
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res.status(404).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });
    });
  },
};