"use strict";
var bodyParser = require('body-parser');
var requestLogger = require("./services/requestLogger");
var articleRouter = require("./article/article.routing");
var sourceRouter = require("./source/source.routing");
var NurtureApi = (function () {
    /**
     * @param app - express application
     * @param port - port to listen on
     */
    function NurtureApi(app, port) {
        this.app = app;
        this.port = port;
        this.configureMiddleware(app);
        this.configureRoutes(app);
        app.get("/api/ping", function (request, response) {
            response.send(new Date());
        });
    }
    /**
     * @param app - express application
     */
    NurtureApi.prototype.configureMiddleware = function (app) {
        app.use(bodyParser.json());
        app.use(requestLogger);
    };
    NurtureApi.prototype.configureRoutes = function (app) {
        app.use("/api", articleRouter);
        app.use("/api", sourceRouter);
    };
    NurtureApi.prototype.run = function () {
        this.app.listen(this.port);
    };
    return NurtureApi;
}());
exports.NurtureApi = NurtureApi;
//# sourceMappingURL=nurtureApi.js.map