"use strict";
var mongoose = require("mongoose");
;
var articleSchema = new mongoose.Schema({
    source: mongoose.Schema.Types.ObjectId,
    title: String,
    thumbnail: String,
    link: String,
    publishedDate: Date
});
var Article = mongoose.model("Article", articleSchema);
module.exports = Article;
//# sourceMappingURL=article.model.js.map