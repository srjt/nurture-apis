import Article = require("../../article/article.model");
import { HtmlParser } from "./htmlParser"

var feed = require("feed-read");

export class RSSReader {

	private rssUrls: Array<string>;
 	constructor(){
		this.rssUrls = new Array<string>();
		//TODO: read it from configs
		// this.rssUrls.push("http://weelicious.com/feed/");
		this.rssUrls.push("http://www.scarymommy.com/feed/");
		// this.rssUrls.push("http://www.momtastic.com/feed/");
	}

	public read(callback){
		let articles = [];
	    let urlCountr = this.rssUrls.length; 
	    let feedCount = 0;
	 		//https://www.npmjs.com/package/feed-read#feedrssrss_string-callback
		this.rssUrls.forEach((feedUrl) =>{
			feed(feedUrl,  (err, feeds) => {
				urlCountr--;
				if (err) throw err;
				feedCount += feeds.length;
				for(let feed of feeds){
					this.createArticleFromFeed(feed,(article) => {
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

	private createArticleFromFeed(feed, callback): any{
 		new HtmlParser().findThumbnailImage(feed, (imgSrc) =>{
 			callback(new Article(
			{
				title: feed.title,
				url: feed.link,
				date: feed.published,
				picUrl: imgSrc
			}))
 		});
	}
	
}