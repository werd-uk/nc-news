const { selectArticleByID, selectArticles } = require("../models/articlesModel");

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
    const { order, sort_by, where } = req.query;
    return selectArticles(where, order, sort_by).then((response) => {
        res.status(200).send(response.rows);
    });
};
