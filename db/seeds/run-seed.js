const ENV = process.env.NODE_ENV || "development";
const devData = require(`../data/${ENV}-data/index.js`);
const seed = require("./seed.js");
const db = require("../connection.js");

const runSeed = () => {
    return seed(devData).then(() => db.end());
};

runSeed();
