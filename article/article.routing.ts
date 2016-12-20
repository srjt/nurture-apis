import express = require("express");
import { ArticleLib } from "./article.lib"
 
let articleRouter = express.Router();
let articleLib = new ArticleLib();

articleRouter.get('/articles', (request: express.Request, response: express.Response) => {
	articleLib.getAll(request.query.pageNo, request.query.pageSize, (articles)=>{
		response.send({info: 'Articles found successfully', data: articles});
	},(err)=>{
		response.send({info: 'Erro getting Articles', error: err});
	});
});

articleRouter.post('/article', (request: express.Request, response: express.Response)=>{
 	articleLib.save(request.body, (savedArticle)=>{
		response.send({info: 'Article saved successfully', article: savedArticle});
	},(err)=>{
		response.send({info: 'Error saving Article ', error: err})
	});
})
// add more route handlers here
// e.g. articleRouter.post('/', (req,res,next)=> {/*...*/})
export = articleRouter;