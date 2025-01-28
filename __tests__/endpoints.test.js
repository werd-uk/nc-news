const request = require("supertest");
const app = require("../api/app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const { topicData, commentData, articleData, userData } = require(`../db/data/test-data`);

beforeEach(() => seed({ topicData, commentData, articleData, userData }));
afterAll(() => db.end());

describe("GET /api/topics", () => {
    test("200: Gets a successful response from the endpoint", () => {
        return request(app).get("/api/topics").expect(200);
    });
    test("200: Gets an array of data from the endpoint", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then((response) => {
                const rows = response.body;
                if (rows.length > 0) {
                    expect(rows.length).toEqual(3);
                    rows.forEach((row) => {
                        expect(row).toHaveProperty("slug");
                        expect(row).toHaveProperty("description");
                    });
                }
            });
    });
});

describe("GET /api/articles/1", () => {
    test("200: responds with article ID #1", () => {
        return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then((response) => {
                expect(response.body.length).toEqual(1);
            });
    });
    test("200: responds with article ID #12", () => {
        return request(app)
            .get("/api/articles/12")
            .expect(200)
            .then((response) => {
                expect(response.body.length).toEqual(1);
                response.body.forEach((row) => {
                    expect(row.article_id).toBe(12);
                });
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
