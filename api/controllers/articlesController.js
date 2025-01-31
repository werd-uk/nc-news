const { selectArticleByID, selectArticles, updateArticleVotes } = require("../models/articlesModel");

exports.getArticleByID = (req, res, next) => {
    return selectArticleByID(req.params.article_id)
        .then((response) => {
            return res.status(200).send(response.rows[0]);
        })
        .catch((err) => {
            if (err.code && err.code.slice(0, 2) === "22") {
                return res.status(400).send({ msg: "Bad request", detail: "Error in query syntax / search" });
            } else {
                next(err);
            }
        });
};

exports.getArticles = (req, res, next) => {
    const { order, sort_by, topic, author } = req.query;
    const where = { topic, author };
    return selectArticles(where, order, sort_by)
        .then((response) => {
            return res.status(200).send(response);
        })
        .catch((err) => {
            next(err);
        });
};

exports.updateVotesByArticleID = (req, res, next) => {
    const { int_votes } = req.body;
    const article_id = req.params.article_id;

    return updateArticleVotes(article_id, int_votes)
        .then((response) => {
            return res.status(200).send(response);
        })
        .catch((err) => next(err));
};
