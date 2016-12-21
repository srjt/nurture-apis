"use strict";
var express = require("express");
var article_lib_1 = require("./article.lib");
var articleRouter = express.Router();
var articleLib = new article_lib_1.ArticleLib();
articleRouter.get("/articles", function (request, response) {
    articleLib.getAll(request.query.pageNo, request.query.pageSize).then(function (articles) {
        response.send({ info: "SUCCESS", data: articles });
    }, function (err) {
        response.send({ info: "ERROR", error: err });
    });
});
articleRouter.post('/article', function (request, response) {
    articleLib.save(request.body).then(function (savedArticle) {
        response.send({ status: "SUCCESS", article: savedArticle });
    }, function (err) {
        response.send({ status: "ERROR", error: err });
    });
});
module.exports = articleRouter;
//# sourceMappingURL=article.routing.js.map