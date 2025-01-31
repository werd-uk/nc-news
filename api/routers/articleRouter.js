const articleRouter = require("express").Router();
const { getArticleByID, getArticles, updateVotesByArticleID } = require("../controllers/articlesController");
const { getCommentsByArticleID, postCommentByArticleID } = require("../controllers/commentsController");

articleRouter.get("", getArticles);
articleRouter.get("/:article_id", getArticleByID);
articleRouter.get("/:article_id/comments", getCommentsByArticleID);
articleRouter.post("/:article_id/comments", postCommentByArticleID);
articleRouter.patch("/:article_id", updateVotesByArticleID);

module.exports = articleRouter;
