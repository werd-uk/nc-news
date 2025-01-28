const db = require("../../db/connection");

exports.selectArticleByID = (articleID) => {
    let SQLQuery = "SELECT author, title, body, article_id, topic, created_at, votes, article_img_url FROM articles";
    const args = [];
    if (articleID) {
        SQLQuery += " WHERE article_id = $1";
        args.push(articleID);
    }
    return db.query(SQLQuery, args).then((response) => {
        if (response.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "No article found", detail: "Article #" + articleID + " does not exist" });
        } else {
            return { rows: response.rows };
        }
    });
};
