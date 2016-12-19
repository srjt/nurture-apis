"use strict";
//reference: https://seanmcgary.com/posts/how-to-structure-a-nodejs-express-project
var Article = require('./article.model');
var ArticleLib = (function () {
    function ArticleLib() {
    }
    ArticleLib.prototype.getAll = function (success, error) {
        Article.find(function (err, articles) {
            if (err) {
                error(err);
            }
            success(articles);
        });
    };
    ArticleLib.prototype.save = function (newArticle, success, error) {
        if (newArticle) {
            console.log(newArticle);
            var articleToSave_1 = new Article(newArticle);
            articleToSave_1.save(function (err) {
                if (err) {
                    error(err);
                }
                success(articleToSave_1);
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