"use strict";
var express = require("express");
var Article = require("./article.lib");
var articleRouter = express.Router();
articleRouter.get('/articles', function (request, response) {
    response.send(Article.getAll());
});
module.exports = articleRouter;
//# sourceMappingURL=article.routing.js.map