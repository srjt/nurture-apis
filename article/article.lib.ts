//reference: https://seanmcgary.com/posts/how-to-structure-a-nodejs-express-project
import * as Article from "./article.model";
var Promise = require("promise");


export class  ArticleLib  {

    constructor(){
    }
    public getAll(pageNo, pageSize) {
        return new Promise( (fulfill, reject) => {
            pageNo = parseInt(pageNo) || 1;    
            pageSize = parseInt(pageSize) || 10;
            Article.find({},(err, articles)=>{
                if(err){
                    reject(err);
                }
                fulfill(articles);
            }).sort({publishedDate: -1})
              .skip((pageNo-1)*pageSize)
              .limit(pageSize);
        });
        
    }
    public getByTitle(title){
        return new Promise((fulfill, reject)=>{
            Article.findOne({title:title},(err, article)=>{
                if(err){
                    reject(err);
                }
                fulfill(article);
            })
        });
    }
    public doesArticleAreadyExist(title){
        return new Promise((fulfill, reject) =>{
            this.getByTitle(title).then((existingArticle)=>{
                if(existingArticle===null){
                    fulfill(false);
                }
                reject(false);
            },()=>{
                reject(false);
            })
        });
    }
    public save(newArticle){
        return new Promise((fulfill, reject)=>{
            this.doesArticleAreadyExist(newArticle.title).then((exists)=>{
                let articleToSave = new Article(newArticle);
                articleToSave.save((err)=>{
                    if(err){
                        reject(err);
                    }
                    fulfill(articleToSave)
                })
            }, ()=>{
                reject("Article already exists \"" + newArticle.title + "\"");
            })
        });
    }

}


//export = articleLib;