const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
const config = {};
require("dotenv").config({
    path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
}

if (ENV === "production") {
    config.max = 2;
    config.connectionString = process.env.DATABASE_URL;
}

module.exports = new Pool(config);
