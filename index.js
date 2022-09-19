const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Route Index
const RouterIndex = require("./router/index");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", RouterIndex);

mongoose.connect(process.env.DB_SERVER, (result) => {
  console.log("Connected to Mongodb");
});

app.listen(process.env.PORT, () =>
  console.log("Listening to port " + process.env.PORT)
);
