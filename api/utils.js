const { selectUserName } = require("./models/usersModel.js");

exports.userNameExists = (username) => {
    return selectUserName(username)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};
