var cheerio = require('cheerio');
var request = require("request");
export class HtmlParser {

 	constructor(){
	}

	public findThumbnailImage(feed: any, callback){
    	let parsedHTML = cheerio.load(feed.content);
		let images =  parsedHTML("img");

		this.selectSpecificThumbnail(images, feed.link, callback, ()=>{
			this.loadFromUrl(feed.link, callback, (err)=>{
				console.log(err ) ;
				callback('');
			});
		});
 	}

	private loadFromUrl(url, callback, error){
		request({url: url, timeout: 500},   (err, response, html) => {
			if(err){console.log(err);}
			if (!err && response.statusCode == 200) {
				var $ = cheerio.load(html);
				var images = $('body img');
				this.selectSpecificThumbnail(images, url, callback, error);
			}
			else{
				error('No image found on url ' + url);
			}
		});
	}

	private selectSpecificThumbnail(images, url, callback, error){
		let thumbnailSrc = '';
		if(images.length >0){
			for(let img of images){
				if(this.isImgOnSameDomain(img.attribs.src, url)){
					thumbnailSrc =  this.cleanUpImageSrc(img.attribs.src);
					break;
				}
			}
 		}
 		if(thumbnailSrc.length >0){
 			callback(thumbnailSrc)
 		}
 		else{ 
 			error('No image found in list');
 		}
	}
	//Sometime src starts with '//'
	private cleanUpImageSrc(url){
		if(url.indexOf("//")==0){
			url = "https:" + url;
		}
		return url;
	}
	private isImgOnSameDomain(imgSrc, url){

  		var result = imgSrc &&
  					 imgSrc.indexOf(this.getDomainNameFromUrl(url)) >= 0 &&
  					 !this.isAvatarImg(imgSrc);
 		if(!result){
 			console.log('IMG ' + imgSrc);
 			console.log('URL ' + url);
 		}
 		return result
	}
	private isAvatarImg(imgSrc){
		let avatarUrl = "gravatar";
		return imgSrc.indexOf(avatarUrl) >=0;
	}
	private getDomainNameFromUrl(url){
		var domain;
		var match = url.match(/(www)?([0-9]?\.)\w?(.[^%/:]+)/i);
	    if (Array.isArray(match) && match.length > 0) {
	    	domain = match[0];
	    }
	    return domain;
	}
}