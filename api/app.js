const express = require("express");

const app = express();
const { errorHandling } = require("./errorHandling");
const articleRouter = require("./routers/articleRouter");
const userRouter = require("./routers/usersRouter");
const commentRouter = require("./routers/commentRouter");
const { apiDocs } = require("./controllers/apiController");
const { getAllTopics } = require("./controllers/topicsController");

app.use(express.json());
app.use("/api/articles", articleRouter);
app.use("/api/users", userRouter);
app.use("/api/comments", commentRouter);
app.get("/api", apiDocs);
app.get("/api/topics", getAllTopics);

app.use(errorHandling);

module.exports = app;
