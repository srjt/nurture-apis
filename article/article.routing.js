"use strict";
var express = require("express");
var article_lib_1 = require("./article.lib");
var articleRouter = express.Router();
var articleLib = new article_lib_1.ArticleLib();
articleRouter.get('/articles', function (request, response) {
    articleLib.getAll(function (articles) {
        response.send({ info: 'Articles found successfully', data: articles });
    }, function (err) {
        response.send({ info: 'Erro getting Articles', error: err });
    });
    // let rssReader = new RSSReader();
    // let articles = rssReader.read((articles) => {
    // 	console.log('Total Articles ' + articles.length);
    // 	articles = articles.sort(function(a,b){
    // 		var c = new Date(a.date);
    // 		var d = new Date(b.date);
    // 		return d.getTime() - c.getTime();
    //		});
    // 	response.send({info: 'Artiles found successfully', data: articles});
    // });
});
articleRouter.post('/article', function (request, response) {
    console.log(request.body);
    articleLib.save(request.body, function (savedArticle) {
        response.send({ info: 'Article saved successfully', article: savedArticle });
    }, function (err) {
        response.send({ info: 'Error saving Article', error: err });
    });
});
module.exports = articleRouter;
//# sourceMappingURL=article.routing.js.map