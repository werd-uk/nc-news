const express = require("express");

const app = express();
const { errorHandling } = require("./errorHandling");
const articleRouter = require("./routers/articleRouter");
const { apiDocs } = require("./controllers/apiController");
const { getAllTopics } = require("./controllers/topicsController");
const { getUsers } = require("./controllers/usersController");
const { removeCommentByID } = require("./controllers/commentsController");

app.use(express.json());
app.use("/api/articles", articleRouter);
app.get("/api", apiDocs);
app.get("/api/topics", getAllTopics);
app.get("/api/users", getUsers);
app.delete("/api/comments/:comment_id", removeCommentByID);

app.use(errorHandling);

module.exports = app;
