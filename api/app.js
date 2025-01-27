const express = require("express");
const app = express();
const { errorHandling } = require("./errorHandling");
const { apiDocs } = require("./controllers/api.controller");

app.use(express.json());

app.get("/api", apiDocs);

//app.use(errorHandling);

module.exports = app;
