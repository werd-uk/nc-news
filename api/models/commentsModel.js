const db = require("../../db/connection");

exports.selectCommentsByArticleID = (articleID) => {
    let sqlQuery = "SELECT comment_id, votes, created_at, author, body, article_id FROM comments WHERE article_id = $1 ORDER BY created_at DESC";

    if (!isNaN(parseInt(articleID))) {
        return db.query(sqlQuery, [articleID]).then((response) => {
            return { comments: response.rows };
        });
    } else {
        return Promise.reject({ status: 400, msg: "Bad request", detail: "Invalid article ID: " + articleID });
    }
};
