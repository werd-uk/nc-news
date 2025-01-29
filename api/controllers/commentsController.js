const { selectCommentsByArticleID, insertCommentByArticleID } = require("../models/commentsModel");

exports.getCommentsByArticleID = (req, res, next) => {
    return selectCommentsByArticleID(req.params.article_id)
        .then((response) => {
            return res.status(200).send(response);
        })
        .catch((err) => next(err));
};

exports.postCommentByArticleID = (req, res, next) => {
    return insertCommentByArticleID(req.params.article_id, req.body)
        .then((response) => {
            return res.status(201).send(response);
        })
        .catch((err) => next(err));
};
