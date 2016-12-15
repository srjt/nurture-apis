import * as mongoose from "mongoose";

interface IArticle{
    articleId: string;
    title:string;
    thumbnail:string;
    url:string;
}

interface IArticleModel extends IArticle, mongoose.Document{};
var articleSchema = new mongoose.Schema({
    articleId: String,
    title: String,
    thumbnail: String,
    url: String,
});

var Article = mongoose.model<IArticleModel>("Article", articleSchema);

export = Article;