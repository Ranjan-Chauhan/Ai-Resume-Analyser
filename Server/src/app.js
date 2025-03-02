const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const resume = require("./routes/resume");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/", resume);

module.exports = app;
