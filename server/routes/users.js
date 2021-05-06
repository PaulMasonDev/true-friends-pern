var express = require("express");
const db = require("../db");
var router = express.Router();

//CREATE USER
router.post("/", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const newUser = await db.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, email, password]
    );
    res.status(201).json({
      staus: "success",
      newUser: newUser.rows[0],
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
