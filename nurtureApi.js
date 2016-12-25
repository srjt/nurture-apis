"use strict";
var bodyParser = require("body-parser");
var requestLogger = require("./services/requestLogger");
var articleRouter = require("./article/article.routing");
var sourceRouter = require("./source/source.routing");
var crawlerRouter = require("./crawler/crawler.routing");
var https = require("https");
var NurtureApi = (function () {
    /**
     * @param app - express application
     * @param port - port to listen on
     */
    function NurtureApi(app, port, portSsl) {
        this.app = app;
        this.port = port;
        this.portSsl = portSsl;
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
        app.use("/api", crawlerRouter);
    };
    NurtureApi.prototype.run = function () {
        this.app.listen(this.port);
        console.info("listening on " + this.port);
    };
    NurtureApi.prototype.runHttps = function (key, cert) {
        var credentails = { key: key, cert: cert, passphrase: "nurture!23" };
        https.createServer(credentails, this.app).listen(this.portSsl);
        console.info("listening on " + this.portSsl);
    };
    return NurtureApi;
}());
exports.NurtureApi = NurtureApi;
//# sourceMappingURL=nurtureApi.js.map