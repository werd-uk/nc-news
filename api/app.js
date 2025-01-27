const express = require("express");
const app = express();
const { errorHandling } = require("./errorHandling");
const { apiDocs } = require("./controllers/apiController");
const { getAllTopics } = require("./controllers/topicsController");

app.use(express.json());

app.get("/api", apiDocs);
app.get("/api/topics", getAllTopics);

app.use(errorHandling);

module.exports = app;

// adding comment to force opportunity for pull request
