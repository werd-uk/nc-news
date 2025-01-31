const { selectUserName } = require("./models/usersModel.js");

exports.userNameExists = (username) => {
    return selectUserName(username)
        .then((response) => {
            return typeof response.user === "undefined" ? false : true;
        })
        .catch(() => {
            return Promise.reject({ status: 500, msg: "Server error", detail: "Unable to check username: " + username });
        });
};
