const { selectUserName, selectUsers } = require("../models/usersModel");

exports.getUser = (req, res, next) => {
    return selectUserName(req.params.username)
        .then((response) => {
            return res.status(200).send(response);
        })
        .catch((err) => next(err));
};
exports.getUsers = (req, res, next) => {
    return selectUsers()
        .then((response) => {
            return res.status(200).send(response);
        })
        .catch((err) => next(err));
};
