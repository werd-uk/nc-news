const db = require("../../db/connection");

exports.selectAllTopics = () => {
    return db.query("select * from topics;").then((response) => {
        return response.rows;
    });
};
