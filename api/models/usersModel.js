const db = require("../../db/connection");

exports.selectUserName = (username) => {
    return db.query("SELECT * FROM users WHERE username = $1", [username]).then((response) => {
        return { user: response.rows };
    });
};

exports.selectUsers = () => {
    return db.query("SELECT * FROM users").then((response) => {
        return { users: response.rows };
    });
};
