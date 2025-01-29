const db = require("../../db/connection");
const { selectArticleByID } = require("../models/articlesModel");
const { userNameExists } = require("../utils");

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

exports.insertCommentByArticleID = (articleID, request) => {
    const { username, body } = request;
    if (username && body) {
        return userNameExists(username).then((bool) => {
            if (bool) {
                return selectArticleByID(articleID)
                    .then((response) => {
                        if (response.rows.length === 0) {
                            return Promise.reject({ status: 404, msg: "Not found", detail: `Article #${articleID} does not exist, cannot post a comment there.` });
                        } else {
                            const sqlQuery = "INSERT INTO comments (body, votes, author, article_id) VALUES ($1, $2, $3, $4) RETURNING body;";
                            return db.query(sqlQuery, [body, 0, username, articleID]).then((response) => {
                                return { inserted: response.rows };
                            });
                        }
                    })
                    .catch((err) => {});
            } else {
                return Promise.reject({ status: 403, msg: "Forbidden", detail: `${username} does not exist.` });
            }
        });
    } else {
        return Promise.reject({ status: 400, msg: "Bad request", detail: "Incomplete or malformed request" });
    }
};
