const db = require("../../db/connection");

exports.selectAllTopics = () => {
    return db.query("select * from topics;").then((response) => {
        if (response.rows === 0) {
            Promise.reject({ status: 404, msg: "No data found" });
        } else {
            return response.rows;
        }
    });
};
