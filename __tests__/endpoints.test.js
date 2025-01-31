const request = require("supertest");
const app = require("../api/app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const { topicData, commentData, articleData, userData } = require(`../db/data/test-data`);

beforeEach(() => seed({ topicData, commentData, articleData, userData }));
afterAll(() => db.end());

describe("GET methods", () => {
    describe("/api/topics", () => {
        test("200: Gets a successful response from the endpoint", () => {
            return request(app).get("/api/topics").expect(200);
        });
        test("200: Gets an array of data from the endpoint", () => {
            return request(app)
                .get("/api/topics")
                .expect(200)
                .then((response) => {
                    const rows = response.body;
                    expect(rows.length).toEqual(3);
                    rows.forEach((row) => {
                        expect(row).toHaveProperty("slug");
                        expect(row).toHaveProperty("description");
                    });
                });
        });
    });

    describe("/api/users", () => {
        test("200: Gets a successful response from the endpoint", () => {
            return request(app).get("/api/users").expect(200);
        });
        test("200: Gets an array of data from the endpoint", () => {
            return request(app)
                .get("/api/users")
                .expect(200)
                .then((response) => {
                    const users = response.body.users;
                    expect(users.length).toEqual(4);
                    users.forEach((user) => {
                        expect(user).toHaveProperty("username");
                        expect(user).toHaveProperty("name");
                        expect(user).toHaveProperty("avatar_url");
                    });
                });
        });
    });

    describe("/api/articles/:id", () => {
        test("200: responds with article ID #1", () => {
            return request(app)
                .get("/api/articles/1")
                .expect(200)
                .then((response) => {
                    const article = response.body;
                    expect(article).toHaveProperty("article_id");
                    expect(article).toHaveProperty("article_img_url");
                    expect(article).toHaveProperty("author");
                    expect(article).toHaveProperty("body");
                    expect(article).toHaveProperty("created_at");
                    expect(article).toHaveProperty("title");
                    expect(article).toHaveProperty("topic");
                    expect(article).toHaveProperty("votes");
                });
        });
        test("200: responds with article ID #12", () => {
            return request(app)
                .get("/api/articles/12")
                .expect(200)
                .then((response) => {
                    const article = response.body;
                    expect(article).toHaveProperty("article_id");
                    expect(article).toHaveProperty("article_img_url");
                    expect(article).toHaveProperty("author");
                    expect(article).toHaveProperty("body");
                    expect(article).toHaveProperty("created_at");
                    expect(article).toHaveProperty("title");
                    expect(article).toHaveProperty("topic");
                    expect(article).toHaveProperty("votes");
                    expect(article).toHaveProperty("comment_count");
                });
        });
        describe("error test block:", () => {
            test("400: responds with a bad request in the body", () => {
                return request(app)
                    .get("/api/articles/duff-id")
                    .expect(400)
                    .then((response) => {
                        expect(response.body).toEqual({ msg: "Bad request", detail: "Error in query syntax / search" });
                    });
            });
            test("404: responds respond with error - not found", () => {
                return request(app)
                    .get("/api/articles/999")
                    .expect(404)
                    .then((response) => {
                        expect(response.body).toEqual({ msg: "No article found", detail: "Article #999 does not exist" });
                    });
            });
        });
    });

    describe("/api/articles", () => {
        test("200: Gets a successful response from the endpoint", () => {
            return request(app).get("/api/articles").expect(200);
        });
        test("200: Gets an array of data from the endpoint, complete with comments", () => {
            return request(app)
                .get("/api/articles")
                .expect(200)
                .then((response) => {
                    const rows = response.body.rows;
                    expect(rows.length).toEqual(13);
                    rows.forEach((row) => {
                        expect(row).toHaveProperty("author");
                        expect(row).toHaveProperty("title");
                        expect(row).toHaveProperty("article_id");
                        expect(row).toHaveProperty("topic");
                        expect(row).toHaveProperty("votes");
                        expect(row).toHaveProperty("article_img_url");
                        expect(row).toHaveProperty("comment_count");
                    });
                });
        });
        test("200: Gets an array of data, with sort by comment_count DESC", () => {
            return request(app)
                .get("/api/articles?sort_by=comment_count&order=DESC")
                .expect(200)
                .then((response) => {
                    const rows = response.body.rows;
                    expect(rows.length).toEqual(13);
                    expect(rows).toBeSortedBy("comment_count", { descending: true });
                    rows.forEach((row) => {
                        expect(row).toHaveProperty("author");
                        expect(row).toHaveProperty("title");
                        expect(row).toHaveProperty("article_id");
                        expect(row).toHaveProperty("topic");
                        expect(row).toHaveProperty("votes");
                        expect(row).toHaveProperty("article_img_url");
                        expect(row).toHaveProperty("comment_count");
                    });
                });
        });
        test("200: Gets an array of data based on matching topic", () => {
            return request(app)
                .get("/api/articles?topic=mitch")
                .expect(200)
                .then((response) => {
                    const rows = response.body.rows;
                    expect(rows.length).toEqual(12);
                    rows.forEach((row) => {
                        expect(row.topic).toBe("mitch");
                    });
                });
        });
        test("200: Gets an array of data based on matching topic, combined with sort", () => {
            return request(app)
                .get("/api/articles?topic=mitch&sort_by=votes")
                .expect(200)
                .then((response) => {
                    const rows = response.body.rows;
                    expect(rows.length).toEqual(12);
                    expect(rows).toBeSortedBy("votes", { descending: true });
                    rows.forEach((row) => {
                        expect(row.topic).toBe("mitch");
                    });
                });
        });
        test("200: Gets an array of data based on matching author, left to default sort (desc)", () => {
            return request(app)
                .get("/api/articles?author=icellusedkars")
                .expect(200)
                .then((response) => {
                    const rows = response.body.rows;
                    expect(rows.length).toEqual(6);
                    expect(rows).toBeSortedBy("created_at", { descending: true });
                    rows.forEach((row) => {
                        expect(row.author).toBe("icellusedkars");
                    });
                });
        });
        test("200: Gets an array of data based on matching topic & author, left to default sort (desc)", () => {
            return request(app)
                .get("/api/articles?topic=mitch&author=icellusedkars")
                .expect(200)
                .then((response) => {
                    const rows = response.body.rows;

                    expect(rows.length).toEqual(6);
                    expect(rows).toBeSortedBy("created_at", { descending: true });
                    rows.forEach((row) => {
                        expect(row.topic).toBe("mitch");
                        expect(row.author).toBe("icellusedkars");
                    });
                });
        });
        describe("error test block:", () => {
            test("404, unable to find matching author good input", () => {
                return request(app)
                    .get("/api/articles?author=drew")
                    .expect(404)
                    .then((response) => {
                        expect(response.body).toEqual({ msg: "No matching articles found", detail: "Some additonal detail here" });
                    });
            });
            test("400, request to sort by a junk column that does not exist", () => {
                return request(app)
                    .get("/api/articles?sort_by=drew")
                    .expect(400)
                    .then((response) => {
                        expect(response.body).toEqual({ msg: "Bad request", detail: "Not possible to sort by column: [drew] DESC" });
                    });
            });
        });
    });

    describe("/api/articles/:article_id/comments", () => {
        test("200: Gets a successful response from the endpoint", () => {
            return request(app).get("/api/articles/1/comments").expect(200);
        });
        test("200: GET the comments for article #1", () => {
            return request(app)
                .get("/api/articles/1/comments")
                .expect(200)
                .then((response) => {
                    const comments = response.body.comments;
                    expect(comments.length).toEqual(11);
                    comments.forEach((comment) => {
                        expect(comment.article_id).toBe(1);
                        expect(comment).toHaveProperty("comment_id");
                        expect(comment).toHaveProperty("votes");
                        expect(comment).toHaveProperty("created_at");
                        expect(comment).toHaveProperty("author");
                        expect(comment).toHaveProperty("article_id");
                        expect(comment).toHaveProperty("body");
                    });
                });
        });
        test("200: GET the comments for article #2, should be empty", () => {
            return request(app)
                .get("/api/articles/2/comments")
                .expect(200)
                .then((response) => {
                    const comments = response.body.comments;
                    expect(comments.length).toEqual(0);
                });
        });
        describe("error test block:", () => {
            test("404: not gound returned, as article #99 doesn't exist", () => {
                return request(app)
                    .get("/api/articles/99/comments")
                    .expect(404)
                    .then((response) => {
                        expect(response.body).toEqual({ msg: "No article found", detail: "Article #99 does not exist" });
                    });
            });
            test("400: Bad request, when given a duff id", () => {
                return request(app)
                    .get("/api/articles/bad-article/comments")
                    .expect(400)
                    .then((response) => {
                        expect(response.body).toEqual({ msg: "Bad request", detail: "Invalid article ID: bad-article" });
                    });
            });
        });
    });
});
describe("POST methods", () => {
    describe("/api/articles/:article_id/comments", () => {
        test("201: Comment Created", () => {
            const testObject = { body: "Test Comment", username: "lurker" };
            return request(app)
                .post("/api/articles/2/comments")
                .send(testObject)
                .expect(201)
                .then((response) => {
                    const comment = response.body.posted[0];
                    expect(comment.body).toEqual(testObject.body);
                });
        });
        describe("error test block:", () => {
            test("400: incomplete request in body", () => {
                return request(app)
                    .post("/api/articles/4/comments")
                    .expect(400)
                    .then((response) => {
                        expect(response.body).toEqual({ msg: "Bad request", detail: "Incomplete or malformed request" });
                    });
            });
            test("403: trying to create a comment for user not in db", () => {
                const testObject = { body: "Test Comment by unknown user", username: "unknownuser" };
                return request(app)
                    .post("/api/articles/7/comments")
                    .send(testObject)
                    .expect(403)
                    .then((response) => {
                        expect(response.body).toEqual({ msg: "Forbidden", detail: "unknownuser does not exist." });
                    });
            });
        });
    });
});
describe("PATCH methods", () => {
    describe("/api/articles/:article_id", () => {
        test("202: Accepted - updated votes by 100", () => {
            return request(app)
                .patch("/api/articles/1")
                .send({ int_votes: 100 })
                .expect(200)
                .then((response) => {
                    const updatedArticle = response.body.article[0];
                    expect(updatedArticle.votes).toEqual(200);
                });
        });
        test("202: Accepted - reduced votes by 100", () => {
            return request(app)
                .patch("/api/articles/1")
                .send({ int_votes: -99 })
                .expect(200)
                .then((response) => {
                    const updatedArticle = response.body.article[0];
                    expect(updatedArticle.votes).toEqual(1);
                });
        });
        test("202: Accepted - reduced votes by 101 (more than allocated)", () => {
            return request(app)
                .patch("/api/articles/1")
                .send({ int_votes: -101 })
                .expect(200)
                .then((response) => {
                    const updatedArticle = response.body.article[0];
                    expect(updatedArticle.votes).toEqual(-1);
                });
        });
        describe("error test block:", () => {
            test("400: int_votes not correctly provided, valid article", () => {
                return request(app)
                    .patch("/api/articles/1")
                    .send({ inc_votes: 123 }) // deliberate typo
                    .expect(400)
                    .then((response) => {
                        expect(response.body).toEqual({ msg: "Bad Request", detail: "No integer provided to increment votes by." });
                    });
            });

            test("400: int_votes not correctly provided, valid article", () => {
                return request(app)
                    .patch("/api/articles/4")
                    .send({ int_votes: "twenty votes" })
                    .expect(400)
                    .then((response) => {
                        expect(response.body).toEqual({ msg: "Bad Request", detail: "No integer provided to increment votes by." });
                    });
            });

            test("404: unable to apply vote change to non-existant article", () => {
                return request(app)
                    .patch("/api/articles/999")
                    .send({ int_votes: 123 })
                    .expect(404)
                    .then((response) => {
                        expect(response.body).toEqual({ msg: "No article found", detail: "Article #999 does not exist" });
                    });
            });
        });
    });
});
describe("DELETE methods", () => {
    describe("/api/comments/:comment_id", () => {
        test("204: Successfully deleted comment", () => {
            return request(app).delete("/api/comments/10").expect(204);
        });
        test("404: not able to delete non-existant comment", () => {
            return request(app)
                .delete("/api/comments/20")
                .expect(404)
                .then((response) => {
                    expect(response.body).toEqual({ msg: "Not found", detail: "Comment #20 does not exist." });
                });
        });
        test("400: not able to delete invalid comment name", () => {
            return request(app)
                .delete("/api/comments/avacado")
                .expect(400)
                .then((response) => {
                    expect(response.body).toEqual({ msg: "Bad request", detail: "avacado is not a valid comment identifier." });
                });
        });
    });
});
