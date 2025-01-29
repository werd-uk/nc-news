const db = require("../../db/connection");

exports.selectCommentsByArticleID = (articleID) => {
    let sqlQuery = "select comment_id, votes, created_at, author, body, article_id FROM comments WHERE article_id = $1 ORDER BY created_at DESC";

    return db
        .query(sqlQuery, [articleID])
        .then((response) => {
            console.table(response.rows);
            return { rows: response.rows };
        })
        .catch((err) => {
            console.log(err);
        });
};
