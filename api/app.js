const express = require("express");
const app = express();
const { errorHandling } = require("./errorHandling");
const { apiDocs } = require("./controllers/apiController");
const { getAllTopics } = require("./controllers/topicsController");
const { getArticleByID, getArticles } = require("./controllers/articlesController");
const { getCommentsByArticleID, postCommentByArticleID } = require("./controllers/commentsController");

app.use(express.json());

app.get("/api", apiDocs);
app.get("/api/topics", getAllTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleByID);
app.get("/api/articles/:article_id/comments", getCommentsByArticleID);
app.post("/api/articles/:article_id/comments", postCommentByArticleID);

app.use(errorHandling);

module.exports = app;
