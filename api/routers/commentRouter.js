const commentRouter = require("express").Router();
const { amendVotesByCommentID, removeCommentByID } = require("../controllers/commentsController");

commentRouter.patch("/:comment_id", amendVotesByCommentID);
commentRouter.delete("/:comment_id", removeCommentByID);

module.exports = commentRouter;
