var express = require("express");
const db = require("../db");
var router = express.Router();

//GET ALL EVENTS
router.get("/:friendId", async (req, res) => {
  const { friendId } = req.params;
  try {
    const foundEvents = await db.query(
      "SELECT * FROM events WHERE friend_id=$1",
      [friendId]
    );
    res.status(201).json({
      status: "success",
      results: foundEvents.rows.length,
      foundEvents: foundEvents.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
});

//CREATE EVENT
router.post("/:friendId", async (req, res) => {
  const { friendId } = req.params;
  const { name, eventDate, notes } = req.body;
  try {
    const newEvent = await db.query(
      "INSERT INTO events (friend_id, name, date, notes) VALUES($1, $2, $3, $4) RETURNING *",
      [friendId, name, eventDate, notes]
    );
    res.status(201).json({
      status: "success",
      newEvent: newEvent.rows[0],
    });
  } catch (error) {
    console.error(error.message);
  }
});

//UPDATE EVENT
router.put("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const { name, eventDate, notes } = req.body;
  try {
    const updatedEvent = await db.query(
      "UPDATE events SET name=$1, date=$2, notes=$3 WHERE id=$4 RETURNING *",
      [name, eventDate, notes, eventId]
    );
    res.status(201).json({
      status: "success",
      updatedEvent: updatedEvent.rows[0],
    });
  } catch (error) {
    console.error(error.message);
  }
});

//DELETE EVENT
router.delete("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const deletedEvent = db.query("DELETE FROM events WHERE id=$1", [eventId]);
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
