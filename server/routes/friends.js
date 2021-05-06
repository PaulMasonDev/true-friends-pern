var express = require("express");
const db = require("../db");
var router = express.Router();

//READ
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await db.query("SELECT * FROM friends WHERE user_id=$1", [
      id,
    ]);
    res.status(201).json({
      status: "success",
      results: response.rows.length,
      friends: response.rows,
    });
  } catch (error) {
    console.error(error.message);
  }
});

//CREATE
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    gender,
    birthday,
    isMother,
    isFather,
  } = req.body;
  try {
    const newFriend = await db.query(
      "INSERT INTO friends (first_name, last_name, gender, birthday, isMother, isFather, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [firstName, lastName, gender, birthday, isMother, isFather, id]
    );
    res.status(201).json({
      status: "success",
      newFriend: newFriend.rows[0],
    });
  } catch (error) {
    console.error(error.message);
  }
});

//UPDATE
router.put("/:id/:friendId", async (req, res) => {
  const { id, friendId } = req.params;
  const {
    firstName,
    lastName,
    gender,
    birthday,
    isMother,
    isFather,
  } = req.body;
  try {
    const updatedFriend = await db.query(
      "UPDATE friends SET first_name=$1, last_name=$2, gender=$3, birthday=$4, isMother=$5, isFather=$6 WHERE user_id=$7 AND id=$8 RETURNING *",
      [firstName, lastName, gender, birthday, isMother, isFather, id, friendId]
    );
    res.status(201).json({
      status: "success",
      updatedFriend: updatedFriend.rows[0],
    });
  } catch (error) {
    console.error(error.message);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFriend = db.query("DELETE FROM friends WHERE id=$1", [id]);
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
