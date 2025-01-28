const endpointsJson = require("../endpoints.json");
const ENV = process.env.NODE_ENV || "development";
const request = require("supertest");
const app = require("../api/app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const { topicData, commentData, articleData, userData } = require(`../db/data/${ENV}-data`);
/* Set up your test imports here */

beforeEach(() => seed({ topicData, commentData, articleData, userData }));
afterAll(() => db.end());

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
