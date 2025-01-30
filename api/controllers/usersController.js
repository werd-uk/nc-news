const { selectUsers } = require("../models/usersModel");

exports.getUsers = (req, res, next) => {
    return selectUsers()
        .then((response) => {
            return res.status(200).send(response);
        })
        .catch((err) => next(err));
};
