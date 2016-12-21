"use strict";
var express = require("express");
var rssReader_1 = require("../services/articleReaders/rssReader");
var source_lib_1 = require("../source/source.lib");
var article_lib_1 = require("../article/article.lib");
var crawlerRouter = express.Router();
var sourceLib = new source_lib_1.SourceLib();
var articleLib = new article_lib_1.ArticleLib();
crawlerRouter.get("/crawl", function (request, response) {
    sourceLib.getAll().then(function (sources) {
        var rssReader = new rssReader_1.RSSReader(sources);
        var articles = rssReader.read(function (articles) {
            for (var _i = 0, articles_1 = articles; _i < articles_1.length; _i++) {
                var article = articles_1[_i];
                articleLib.save(article).then(function (savedArticle) {
                }, function (err) {
                    console.log("Error saving article " + err);
                });
            }
            response.send({ status: "SUCCESS", data: "Total articles crawled: " + articles.length });
        });
    }, function (err) {
        response.send({ status: "ERROR" });
    });
});
module.exports = crawlerRouter;
//# sourceMappingURL=crawler.routing.js.map