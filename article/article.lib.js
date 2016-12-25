"use strict";
//reference: https://seanmcgary.com/posts/how-to-structure-a-nodejs-express-project
var Article = require("./article.model");
var Promise = require("promise");
var ArticleLib = (function () {
    function ArticleLib() {
    }
    ArticleLib.prototype.getAll = function (pageNo, pageSize) {
        return new Promise(function (fulfill, reject) {
            pageNo = parseInt(pageNo) || 1;
            pageSize = parseInt(pageSize) || 13;
            Article.find({}, function (err, articles) {
                if (err) {
                    reject(err);
                }
                fulfill(articles);
            }).sort({ publishedDate: -1 })
                .skip((pageNo - 1) * pageSize)
                .limit(pageSize);
        });
    };
    ArticleLib.prototype.getByTitle = function (title) {
        return new Promise(function (fulfill, reject) {
            Article.findOne({ title: title }, function (err, article) {
                if (err) {
                    reject(err);
                }
                fulfill(article);
            });
        });
    };
    ArticleLib.prototype.doesArticleAreadyExist = function (title) {
        var _this = this;
        return new Promise(function (fulfill, reject) {
            _this.getByTitle(title).then(function (existingArticle) {
                if (existingArticle === null) {
                    fulfill(false);
                }
                reject(false);
            }, function () {
                reject(false);
            });
        });
    };
    ArticleLib.prototype.save = function (newArticle) {
        var _this = this;
        return new Promise(function (fulfill, reject) {
            _this.doesArticleAreadyExist(newArticle.title).then(function (exists) {
                var articleToSave = new Article(newArticle);
                articleToSave.save(function (err) {
                    if (err) {
                        reject(err);
                    }
                    fulfill(articleToSave);
                });
            }, function () {
                reject("Article already exists \"" + newArticle.title + "\"");
            });
        });
    };
    return ArticleLib;
}());
exports.ArticleLib = ArticleLib;
//export = articleLib; 
//# sourceMappingURL=article.lib.js.map