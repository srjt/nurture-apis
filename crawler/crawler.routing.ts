import express = require("express");
import { RSSReader } from "../services/articleReaders/rssReader";
import { SourceLib } from "../source/source.lib"
import { ArticleLib } from "../article/article.lib"

let crawlerRouter = express.Router();
let sourceLib = new SourceLib();
let articleLib = new ArticleLib();
 
crawlerRouter.get("/crawl", (request: express.Request, response: express.Response) => {
	sourceLib.getAll().then((sources)=>{
		let rssReader = new RSSReader(sources);
		let articles = rssReader.read((articles) => {
			for(let article of articles){ //TODO: do the 'existing article ' check even before parsing html
				articleLib.save(article).then((savedArticle)=>{
				},(err)=>{
					console.log("Error saving article "+ err);
				});
			}
			response.send({status: "SUCCESS", data: "Total articles crawled: " +  articles.length});
		});
	},(err)=>{
		response.send({status:"ERROR"})
	})
});

export = crawlerRouter;