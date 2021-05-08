var express = require("express");
const db = require("../db");
var router = express.Router();

//GET ALL ITEMS
router.get("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const foundItems = await db.query("SELECT * FROM items WHERE event_id=$1", [
      eventId,
    ]);
    res.status(201).json({
      status: "success",
      results: foundItems.rows.length,
      foundItems: foundItems.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
});

//CREATE ITEM
router.post("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const { name, description, isPurchased } = req.body;
  try {
    const newItem = await db.query(
      "INSERT INTO items (event_id, name, description, ispurchased) VALUES($1, $2, $3, $4) RETURNING *",
      [eventId, name, description, isPurchased]
    );
    res.status(201).json({
      status: "success",
      newItem: newItem.rows[0],
    });
  } catch (error) {
    console.error(error.message);
  }
});

//UPDATE ITEM
router.put("/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const { name, description, isPurchased } = req.body;
  try {
    const updatedItem = await db.query(
      "UPDATE items SET name=$1, description=$2, ispurchased=$3 WHERE id=$4 RETURNING *",
      [name, description, isPurchased, itemId]
    );
    res.status(201).json({
      status: "success",
      updatedItem: updatedItem.rows[0],
    });
  } catch (error) {
    console.error(error.message);
  }
});

//DELETE ITEM
router.delete("/:itemId", async (req, res) => {
  const { itemId } = req.params;
  try {
    const deletedItem = db.query("DELETE FROM items WHERE id=$1", [itemId]);
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
