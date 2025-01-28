const express = require("express");
const app = express();
const { errorHandling } = require("./errorHandling");
const { apiDocs } = require("./controllers/apiController");
const { getAllTopics } = require("./controllers/topicsController");
const { getArticleByID, getArticles } = require("./controllers/articlesController");

app.use(express.json());

app.get("/api", apiDocs);
app.get("/api/topics", getAllTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleByID);

app.use(errorHandling);

module.exports = app;

// adding comment to force opportunity for pull request
