"use strict";
var express = require("express");
var rssReader_1 = require("../services/articleReaders/rssReader");
var source_lib_1 = require("../source/source.lib");
var article_lib_1 = require("../article/article.lib");
var crawlerRouter = express.Router();
var sourceLib = new source_lib_1.SourceLib();
var articleLib = new article_lib_1.ArticleLib();
crawlerRouter.get('/crawl', function (request, response) {
    sourceLib.getAll(function (sources) {
        var rssReader = new rssReader_1.RSSReader(sources);
        var newArticleFound = 10;
        var articles = rssReader.read(function (articles) {
            for (var _i = 0, articles_1 = articles; _i < articles_1.length; _i++) {
                var article = articles_1[_i];
                articleLib.save(article, function (savedArticle) {
                    console.log('saved article ' + newArticleFound);
                    newArticleFound++;
                }, function (err) {
                    console.error('Error saving article ' + err);
                });
            }
            response.send({ info: 'Artiles crawled successfully', data: 'Total articles found: ' + newArticleFound });
        });
    }, function (err) {
        response.send({ info: 'Error crawling articles' });
    });
});
module.exports = crawlerRouter;
//# sourceMappingURL=crawler.routing.js.map