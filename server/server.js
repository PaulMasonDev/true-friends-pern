const express = require("express");
const cors = require("cors");
const db = require("./db");
//ROUTE IMPORTS
const users = require("./routes/users");
const friends = require("./routes/friends");
const events = require("./routes/events");
const items = require("./routes/items");

const app = express();

app.use(cors());
app.use(express.json());

require("dotenv").config();

const port = process.env.PORT;

app.use("/api/v1/users", users);
app.use("/api/v1/friends", friends);
app.use("/api/v1/events", events);
app.use("/api/v1/items", items);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
