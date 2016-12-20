"use strict";
var express = require("express");
var article_lib_1 = require("./article.lib");
var articleRouter = express.Router();
var articleLib = new article_lib_1.ArticleLib();
articleRouter.get('/articles', function (request, response) {
    articleLib.getAll(request.query.pageNo, request.query.pageSize, function (articles) {
        response.send({ info: 'Articles found successfully', data: articles });
    }, function (err) {
        response.send({ info: 'Erro getting Articles', error: err });
    });
});
articleRouter.post('/article', function (request, response) {
    articleLib.save(request.body, function (savedArticle) {
        response.send({ info: 'Article saved successfully', article: savedArticle });
    }, function (err) {
        response.send({ info: 'Error saving Article ', error: err });
    });
});
module.exports = articleRouter;
//# sourceMappingURL=article.routing.js.map