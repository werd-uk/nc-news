const { selectCommentsByArticleID } = require("../models/commentsModel");

exports.getCommentsByArticleID = (req, res, next) => {
    return selectCommentsByArticleID(req.params.article_id)
        .then((response) => {
            console.log(response);
            res.status(200).send(response);
        })
        .catch((err) => next(err));
};
