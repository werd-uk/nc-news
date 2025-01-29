const { selectUserName } = require("./models/userModel.js");

exports.userNameExists = (username) => {
    return selectUserName(username)
        .then((response) => {
            return response.user.length === 1 ? true : false;
        })
        .catch((err) => console.log(err));
};
