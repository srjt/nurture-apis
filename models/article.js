"use strict";
var mongoose = require("mongoose");
;
var articleSchema = new mongoose.Schema({
    articleId: String,
    title: String,
    thumbnail: String,
    url: String,
});
var Article = mongoose.model("Article", articleSchema);
module.exports = Article;
//# sourceMappingURL=Article.js.map