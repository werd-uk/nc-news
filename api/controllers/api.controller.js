const endpointDetail = require("../../endpoints.json");

exports.apiDocs = (req, res, next) => {
    return res.status(200).send(endpointDetail);
};
