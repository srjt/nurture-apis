import Source = require("../../source/source.model");

import Article = require("../../article/article.model");
import { HtmlParser } from "./htmlParser"

var feed = require("feed-read");

export class RSSReader {

	private rssSources: Array<any>;
 	constructor(rssSrouces:Array<any>){
		this.rssSources = rssSrouces;
	}

	public read(callback){
		let articles = [];
	    let urlCountr = this.rssSources.length; 
	    let feedCount = 0;
	    //https://www.npmjs.com/package/feed-read#feedrssrss_string-callback
		this.rssSources.forEach((rssSource) =>{
			feed(rssSource.link,  (err, feeds) => {
				urlCountr--;
				if (err) throw err;
				feedCount += feeds.length;
				for(let feed of feeds){
					this.createArticleFromFeed(rssSource._id, feed,(article) => {
						articles.push(article);
						feedCount--;
						if(urlCountr==0 && feedCount==0){
							callback(articles);
						}
					});
				}
			});
		})
	}

	private createArticleFromFeed(source, feed, callback): any{
 		new HtmlParser().findThumbnailImage(feed, (imgSrc) =>{
 			callback(new Article(
			{
				source: source,
				title: feed.title,
				thumbnail: imgSrc,
				link: feed.link,
				publishedDate: feed.published
			}))
 		});
	}
	
}