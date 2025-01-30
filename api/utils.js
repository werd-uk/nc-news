const { selectUserName } = require("./models/usersModel.js");

exports.userNameExists = (username) => {
    return selectUserName(username)
        .then((response) => {
            return response.user.length === 1 ? true : false;
        })
        .catch((err) => {
            return Promise.reject({ status: 500, msg: "Server error", detail: "Unable to check username: " + username });
        });
};
