const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../api/app");
/* Set up your test imports here */

afterAll(() => db.end());

/* Set up your beforeEach & afterAll functions here */

describe("GET /api", () => {
    test("200: Responds with an object detailing the documentation for each endpoint", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(endpointsJson);
            });
    });
});
