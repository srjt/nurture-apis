//reference: https://seanmcgary.com/posts/how-to-structure-a-nodejs-express-project
import * as Article from './article.model';


export class  ArticleLib  {

    constructor(){
    }
    public getAll(pageNo, pageSize, success, error) {
        pageNo = parseInt(pageNo) || 1;
        pageSize = parseInt(pageSize) || 10;
        Article.find({},(err, articles)=>{
            if(err){
                error(err);
            }
            success(articles);
        }).sort({publishedDate: -1})
          .skip(pageNo*pageSize)
          .limit(pageSize);
    }
    public getByTitle(title, success, error){
        Article.findOne({title:title},(err, article)=>{
            if(err){
                error(error);
            }
            success(article);
        })
    }
    public save(newArticle, success, error){
        if(newArticle){ 
            this.getByTitle(newArticle.title, (existingArticle)=>{ //TODO: check should based on title and source
                if(existingArticle === null){
                    let articleToSave = new Article(newArticle);
                    articleToSave.save((err)=>{
                        if(err){
                            error(err);
                        }
                        success(articleToSave);
                    });  
                }else{
                    error('Article already exists ' + existingArticle);
                }
            },(err)=>{
                error(err)  
            });
        }
        else{
            error('No a valid article');
        }
    }

}


//export = articleLib;