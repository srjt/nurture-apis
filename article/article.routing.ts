import express = require("express");
import { ArticleLib } from "./article.lib"
import { RSSReader } from "../services/articleReaders/rssReader";

let articleRouter = express.Router();
let articleLib = new ArticleLib();

articleRouter.get('/articles', (request: express.Request, response: express.Response) => {
	articleLib.getAll((articles)=>{
		response.send({info: 'Articles found successfully', data: articles});
	},(err)=>{
		response.send({info: 'Erro getting Articles', error: err});
	});
	// let rssReader = new RSSReader();
	// let articles = rssReader.read((articles) => {
	// 	console.log('Total Articles ' + articles.length);
	// 	articles = articles.sort(function(a,b){
	// 		var c = new Date(a.date);
	// 		var d = new Date(b.date);
	// 		return d.getTime() - c.getTime();
 	//		});
	// 	response.send({info: 'Artiles found successfully', data: articles});
	// });
 

});

articleRouter.post('/article', (request: express.Request, response: express.Response)=>{
	console.log(request.body);
 	articleLib.save(request.body, (savedArticle)=>{
		response.send({info: 'Article saved successfully', article: savedArticle});
	},(err)=>{
		response.send({info: 'Error saving Article', error: err})
	});
})
// add more route handlers here
// e.g. articleRouter.post('/', (req,res,next)=> {/*...*/})
export = articleRouter;