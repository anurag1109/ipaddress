const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const { connection } = require("./config/db");
const { userrouter } = require("./route/userroute");
app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/user", userrouter);
// app.use("/user",userrouter)

app.listen(4500, async () => {
  try {
    await connection;
    console.log("Connected to mongodb");
  } catch (err) {
    console.log(err);
  }
  console.log("server is running at port 4500");
});
