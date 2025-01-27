const { selectAllTopics } = require("../models/topicsModel");

exports.getAllTopics = (req, res, next) => {
    return selectAllTopics()
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((err) => {
            next(err);
        });
};
