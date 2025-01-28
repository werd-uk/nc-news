const db = require("../../db/connection");

exports.selectArticleByID = (articleID) => {
    let sqlQuery = "SELECT author, title, body, article_id, topic, created_at, votes, article_img_url FROM articles";
    const args = [];
    if (articleID) {
        sqlQuery += " WHERE article_id = $1";
        args.push(articleID);
    }
    return db.query(sqlQuery, args).then((response) => {
        if (response.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "No article found", detail: "Article #" + articleID + " does not exist" });
        } else {
            return { rows: response.rows };
        }
    });
};
