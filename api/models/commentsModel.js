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
                return selectArticleByID(articleID).then((response) => {
                    if (response.rows.length === 0) {
                        return Promise.reject({ status: 404, msg: "Not found", detail: `Article #${articleID} does not exist, cannot post a comment there.` });
                    } else {
                        const sqlQuery = "INSERT INTO comments (body, votes, author, article_id) VALUES ($1, $2, $3, $4) RETURNING body;";
                        return db.query(sqlQuery, [body, 0, username, articleID]).then((response) => {
                            return { posted: response.rows };
                        });
                    }
                });
            } else {
                return Promise.reject({ status: 403, msg: "Forbidden", detail: `${username} does not exist.` });
            }
        });
    } else {
        return Promise.reject({ status: 400, msg: "Bad request", detail: "Incomplete or malformed request" });
    }
};
exports.deleteCommentByID = (commentID) => {
    const commentIsNumber = /\d+/.test(commentID);
    if (commentIsNumber) {
        return db.query("SELECT * FROM comments WHERE comment_id = $1", [commentID]).then((response) => {
            if (response.rows.length === 0) {
                return Promise.reject({ status: 404, msg: "Not found", detail: `Comment #${commentID} does not exist.` });
            } else {
                return db.query("DELETE FROM comments WHERE comment_id = $1 RETURNING *", [commentID]).then((response) => {
                    if (response.rows.length === 1) {
                        return Promise.resolve({ status: 204, msg: "Deleted succesfully", detail: `Comment #${response.rows[0].comment_id} has been deleted.` });
                    } else {
                        return Promise.reject({ status: 500, msg: "Delete Failed", detail: "Unable to delete the comment, as requested." });
                    }
                });
            }
        });
    } else {
        return Promise.reject({ status: 400, msg: "Bad request", detail: `${commentID} is not a valid comment identifier.` });
    }
};
