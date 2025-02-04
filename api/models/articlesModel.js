const db = require("../../db/connection");

exports.selectArticleByID = (articleID) => {
    let sqlQuery = "SELECT a.author, a.title, a.body, a.article_id, a.topic, a.created_at, a.votes, a.article_img_url, count(c.comment_id)::INT AS comment_count FROM articles as a";
    sqlQuery += " LEFT JOIN comments AS c on a.article_id = c.article_id";
    const args = [];
    if (articleID) {
        sqlQuery += " WHERE a.article_id = $1";
        args.push(articleID);
    }
    sqlQuery += " GROUP BY a.author, a.title, a.body, a.article_id, a.topic, a.created_at, a.votes, a.article_img_url";

    return db.query(sqlQuery, args).then((response) => {
        if (response.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "No article found", detail: "Article #" + articleID + " does not exist" });
        } else {
            return { rows: response.rows };
        }
    });
};

exports.selectArticles = (where, order = "DESC", sort_by = "created_at") => {
    return db.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'articles';").then((response) => {
        let sqlQuery = "SELECT a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, a.article_img_url, count(c.comment_id)::INT as comment_count FROM articles AS a";
        const whereArgs = [];
        const columnGreenList = [];
        response.rows.forEach((row) => {
            columnGreenList.push(row.column_name);
        });
        columnGreenList.push("comment_count");

        sqlQuery += " LEFT JOIN comments AS c ON c.article_id = a.article_id";
        if (where.topic || where.author) {
            sqlQuery += " WHERE ";

            if (where.topic) {
                sqlQuery += "topic = $" + (whereArgs.length + 1);
                whereArgs.push(where.topic);
            }
            if (where.author) {
                if (whereArgs.length > 0) {
                    sqlQuery += " AND a.author = $" + (whereArgs.length + 1);
                    whereArgs.push(where.author);
                } else {
                    sqlQuery += "a.author = $" + (whereArgs.length + 1);
                    whereArgs.push(where.author);
                }
            }
        }

        sqlQuery += " GROUP BY a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, a.article_img_url";

        if (columnGreenList.includes(sort_by) && (order.toUpperCase() === "ASC" || order.toUpperCase() === "DESC")) {
            sqlQuery += " ORDER BY " + sort_by + " " + order;
        } else {
            return Promise.reject({ status: 400, msg: "Bad request", detail: `Not possible to sort by column: [${sort_by}] ${order}` });
        }

        return db.query(sqlQuery, whereArgs).then((response) => {
            if (response.rows.length === 0) {
                return Promise.reject({ status: 404, msg: "Not Found", detail: "No matching articles found." });
            } else {
                return { rows: response.rows };
            }
        });
    });
};

exports.updateArticleVotes = (article_id, voteChange) => {
    if (voteChange && typeof voteChange === "number") {
        return this.selectArticleByID(article_id).then((response) => {
            const articleVotes = response.rows[0].votes;
            const newVoteCount = articleVotes + voteChange;
            return db.query("UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *;", [newVoteCount, article_id]).then((response) => {
                return { article: response.rows };
            });
        });
    } else {
        return Promise.reject({ status: 400, msg: "Bad Request", detail: "No integer provided to increment votes by." });
    }
};
