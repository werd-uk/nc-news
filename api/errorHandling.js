exports.errorHandling = (err, req, res, next) => {
    // TODO: Build error handling, once you've built functions / endpoints
    if ([404, 400, 403].includes(err.status)) {
        return res.status(err.status).send({ msg: err.msg, detail: err.detail });
    } else {
        next(err);
    }
};

exports.errorCatchAll = (err, req, res, next) => {
    // TODO: Build error handling, once you've built functions / endpoints
    if (err) {
        return res.status(500).send({ msg: "Server Error", detail: err });
    }
};
