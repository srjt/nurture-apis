import * as mongoose from "mongoose";
interface IArticle{
    title:string;
    thumbnail:string;
    link:string;
    publishedDate: Date;
}

interface IArticleModel extends IArticle, mongoose.Document{};
var articleSchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    link: String,
    publishedDate: Date
});

let Article = mongoose.model<IArticleModel>("Article", articleSchema);

export = Article;	
