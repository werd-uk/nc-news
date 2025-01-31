const db = require("../../db/connection");

exports.selectUserName = (username) => {
    return db.query("SELECT * FROM users WHERE username = $1", [username]).then((response) => {
        if (response.rowCount === 0) {
            return Promise.reject({ status: 404, msg: "Not found", detail: `${username} does not exist.` });
        } else {
            return { user: response.rows[0] };
        }
    });
};

exports.selectUsers = () => {
    return db.query("SELECT * FROM users").then((response) => {
        return { users: response.rows };
    });
};
