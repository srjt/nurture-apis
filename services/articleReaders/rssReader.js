"use strict";
var Article = require("../../article/article.model");
var htmlParser_1 = require("./htmlParser");
var feed = require("feed-read");
var RSSReader = (function () {
    function RSSReader() {
        this.rssUrls = new Array();
        //TODO: read it from configs
        this.rssUrls.push("http://weelicious.com/feed/");
        this.rssUrls.push("http://www.scarymommy.com/feed/");
        this.rssUrls.push("http://www.momtastic.com/feed/");
    }
    RSSReader.prototype.read = function (callback) {
        var _this = this;
        var articles = [];
        var urlCountr = this.rssUrls.length;
        var feedCount = 0;
        //https://www.npmjs.com/package/feed-read#feedrssrss_string-callback
        this.rssUrls.forEach(function (feedUrl) {
            feed(feedUrl, function (err, feeds) {
                urlCountr--;
                if (err)
                    throw err;
                feedCount += feeds.length;
                for (var _i = 0, feeds_1 = feeds; _i < feeds_1.length; _i++) {
                    var feed_1 = feeds_1[_i];
                    _this.createArticleFromFeed(feed_1, function (article) {
                        articles.push(article);
                        feedCount--;
                        if (urlCountr == 0 && feedCount == 0) {
                            callback(articles);
                        }
                    });
                }
            });
        });
    };
    RSSReader.prototype.createArticleFromFeed = function (feed, callback) {
        new htmlParser_1.HtmlParser().findThumbnailImage(feed, function (imgSrc) {
            callback(new Article({
                title: feed.title,
                url: feed.link,
                date: feed.published,
                picUrl: imgSrc
            }));
        });
    };
    return RSSReader;
}());
exports.RSSReader = RSSReader;
//# sourceMappingURL=rssReader.js.map