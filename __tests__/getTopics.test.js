const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../api/app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const { topicData, commentData, articleData, userData } = require("../db/data/test-data");
/* Set up your test imports here */

beforeEach(() => seed({ topicData, commentData, articleData, userData }));
afterAll(() => db.end());

/* Set up your beforeEach & afterAll functions here */

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
                expect(rows.length).toEqual(3);
                rows.forEach((row) => {
                    expect(row).toHaveProperty("slug");
                    expect(row).toHaveProperty("description");
                });
            });
    });
});
