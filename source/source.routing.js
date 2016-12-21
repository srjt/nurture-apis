"use strict";
var express = require("express");
var source_lib_1 = require("./source.lib");
var sourceRouter = express.Router();
var sourceLib = new source_lib_1.SourceLib();
sourceRouter.get("/sources", function (request, response) {
    sourceLib.getAll().then(function (sources) {
        response.send({ status: "SUCCESS", data: sources });
    }, function (err) {
        response.send({ status: "ERROR", error: err });
    });
});
sourceRouter.post("/source", function (request, response) {
    sourceLib.save(request.body).then(function (savedSource) {
        response.send({ status: "SUCCESS", source: savedSource });
    }, function (err) {
        response.send({ status: "ERROR", error: err });
    });
});
module.exports = sourceRouter;
//# sourceMappingURL=source.routing.js.map