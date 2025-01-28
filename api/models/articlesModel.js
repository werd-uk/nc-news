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

exports.selectArticles = async (where, order = "DESC", sort_by = "created_at") => {
    let sqlQuery = "SELECT a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, a.article_img_url, count(c.comment_id)::INT as comment_count FROM articles AS a";
    const whereArgs = [];
    const columnGreenList = [];
    await db.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'articles';").then((response) => {
        response.rows.forEach((row) => {
            columnGreenList.push(row.column_name);
        });
        columnGreenList.push("comment_count");
    });
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
    if (columnGreenList.includes(sort_by)) {
        sqlQuery += " ORDER BY " + sort_by + " " + order;
    }

    return db.query(sqlQuery, whereArgs).then((response) => {
        if (response.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "No matching articles found", detail: "Some additonal detail here" });
        } else {
            return { rows: response.rows };
        }
    });
};
