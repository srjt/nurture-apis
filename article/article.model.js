"use strict";
var mongoose = require("mongoose");
;
var articleSchema = new mongoose.Schema({
    source: { type: mongoose.Schema.Types.ObjectId, ref: 'Source' },
    title: String,
    thumbnail: String,
    link: String,
    publishedDate: Date
});
var Article = mongoose.model("Article", articleSchema);
module.exports = Article;
//# sourceMappingURL=article.model.js.map