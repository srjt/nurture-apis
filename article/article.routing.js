"use strict";
var express = require("express");
var article_lib_1 = require("./article.lib");
var rssReader_1 = require("../services/articleReaders/rssReader");
var articleRouter = express.Router();
articleRouter.get('/articles', function (request, response) {
    var articleLib = new article_lib_1.ArticleLib();
    var rssReader = new rssReader_1.RSSReader();
    var articles = rssReader.read(function (articles) {
        console.log('Total Articles ' + articles.length);
        articles = articles.sort(function (a, b) {
            var c = new Date(a.date);
            var d = new Date(b.date);
            return d.getTime() - c.getTime();
        });
        response.send({ info: 'Artiles found successfully', data: articles });
    });
    //	Article.find((err, Articles) => {
    //        if (err) {
    //            res.json({info: 'error during find Articles', error: err});
    //        };
    //        res.json({info: 'Articles found successfully', data: getTestArticles().data});
    //    });
});
module.exports = articleRouter;
//# sourceMappingURL=article.routing.js.map