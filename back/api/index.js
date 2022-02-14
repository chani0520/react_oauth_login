const express = require("express");
const auth = require("./auth");

const api = express.Router();

api.use("/api", auth);

module.exports = api;
