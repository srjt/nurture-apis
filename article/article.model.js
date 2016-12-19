"use strict";
var mongoose = require("mongoose");
;
var articleSchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    url: String,
    picUrl: String,
    date: Date
});
var Article = mongoose.model("Article", articleSchema);
module.exports = Article;
//# sourceMappingURL=article.model.js.map