"use strict";
//reference: https://seanmcgary.com/posts/how-to-structure-a-nodejs-express-project
var Article = require('./article.model');
var ArticleLib = (function () {
    function ArticleLib() {
    }
    ArticleLib.prototype.getAll = function (pageNo, pageSize, success, error) {
        pageNo = parseInt(pageNo) || 1;
        pageSize = parseInt(pageSize) || 10;
        Article.find({}, function (err, articles) {
            if (err) {
                error(err);
            }
            success(articles);
        }).sort({ publishedDate: -1 })
            .skip(pageNo * pageSize)
            .limit(pageSize);
    };
    ArticleLib.prototype.getByTitle = function (title, success, error) {
        Article.findOne({ title: title }, function (err, article) {
            if (err) {
                error(error);
            }
            success(article);
        });
    };
    ArticleLib.prototype.save = function (newArticle, success, error) {
        if (newArticle) {
            this.getByTitle(newArticle.title, function (existingArticle) {
                if (existingArticle === null) {
                    var articleToSave_1 = new Article(newArticle);
                    articleToSave_1.save(function (err) {
                        if (err) {
                            error(err);
                        }
                        success(articleToSave_1);
                    });
                }
                else {
                    error('Article already exists ' + existingArticle);
                }
            }, function (err) {
                error(err);
            });
        }
        else {
            error('No a valid article');
        }
    };
    return ArticleLib;
}());
exports.ArticleLib = ArticleLib;
//export = articleLib; 
//# sourceMappingURL=article.lib.js.map