//reference: https://seanmcgary.com/posts/how-to-structure-a-nodejs-express-project
import * as Article from './article.model';


export class  ArticleLib  {

    constructor(){
    }
    public getAll(success, error) {
        Article.find((err, articles)=>{
            if(err){
                error(err);
            }
            success(articles);
        });
    }
    public save(newArticle, success, error){
        if(newArticle){ 
                    console.log(newArticle);

            let articleToSave = new Article(newArticle);
            articleToSave.save((err)=>{
                if(err){
                    error(err);
                }
                success(articleToSave);
            });
        }
        else{
            error('No a valid article');
        }
    }

}


//export = articleLib;