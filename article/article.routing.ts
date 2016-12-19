import express = require("express");
import { ArticleLib } from "./article.lib"
import { RSSReader } from "../services/articleReaders/rssReader";

let articleRouter = express.Router();
articleRouter.get('/articles', (request: express.Request, response: express.Response) => {
	let articleLib = new ArticleLib();
	let rssReader = new RSSReader();
	let articles = rssReader.read((articles) => {
		console.log('Total Articles ' + articles.length);
		articles = articles.sort(function(a,b){
			var c = new Date(a.date);
			var d = new Date(b.date);
			return d.getTime() - c.getTime();
 		});
		response.send({info: 'Artiles found successfully', data: articles});
	});
 //	Article.find((err, Articles) => {
 //        if (err) {
 //            res.json({info: 'error during find Articles', error: err});
 //        };
 //        res.json({info: 'Articles found successfully', data: getTestArticles().data});
 //    });

});
// add more route handlers here
// e.g. articleRouter.post('/', (req,res,next)=> {/*...*/})
export = articleRouter;