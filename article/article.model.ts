import * as mongoose from "mongoose";
interface IArticle{
    title:string;
    thumbnail:string;
    url:string;
    picUrl:string,
    date: Date;
}

interface IArticleModel extends IArticle, mongoose.Document{};
var articleSchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    url: String,
    picUrl: String,
    date: Date
});

let Article = mongoose.model<IArticleModel>("Article", articleSchema);

export = Article;	
