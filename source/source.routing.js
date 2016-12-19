"use strict";
var express = require("express");
var source_lib_1 = require("./source.lib");
var sourceRouter = express.Router();
var sourceLib = new source_lib_1.SourceLib();
sourceRouter.get('/sources', function (request, response) {
    sourceLib.getAll(function (sources) {
        response.send({ info: 'Sources found successfully', data: sources });
    }, function (err) {
        response.send({ info: 'Erro getting Sources', error: err });
    });
});
sourceRouter.post('/source', function (request, response) {
    console.log(request.body);
    sourceLib.save(request.body, function (savedSource) {
        response.send({ info: 'Source saved successfully', source: savedSource });
    }, function (err) {
        response.send({ info: 'Error saving Source', error: err });
    });
});
module.exports = sourceRouter;
//# sourceMappingURL=source.routing.js.map