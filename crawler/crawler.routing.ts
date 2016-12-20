import express = require("express");
import { RSSReader } from "../services/articleReaders/rssReader";
import { SourceLib } from "../source/source.lib"
import { ArticleLib } from "../article/article.lib"

let crawlerRouter = express.Router();
let sourceLib = new SourceLib();
let articleLib = new ArticleLib();
 
crawlerRouter.get('/crawl', (request: express.Request, response: express.Response) => {

	sourceLib.getAll((sources)=>{
		let rssReader = new RSSReader(sources);
		let articles = rssReader.read((articles) => {
			for(let article of articles){ //TODO: do the 'existing article ' check even before parsing html
				articleLib.save(article, (savedArticle)=>{
				},(err)=>{
					console.error('Error saving article ' + err);
				});	
			}
			response.send({info: 'Artiles crawled successfully', data: 'Total articles crawled: ' +  articles.length});
		});	
	},(err)=>{
		response.send({info:'Error crawling articles'})
	})

	
});

export = crawlerRouter;