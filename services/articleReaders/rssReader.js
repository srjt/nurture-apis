"use strict";
var Article = require("../../article/article.model");
var htmlParser_1 = require("./htmlParser");
var feed = require("feed-read");
var RSSReader = (function () {
    function RSSReader(rssSrouces) {
        this.rssSources = rssSrouces;
    }
    RSSReader.prototype.read = function (callback) {
        var _this = this;
        var articles = [];
        var urlCountr = this.rssSources.length;
        var feedCount = 0;
        //https://www.npmjs.com/package/feed-read#feedrssrss_string-callback
        this.rssSources.forEach(function (rssSource) {
            feed(rssSource.link, function (err, feeds) {
                urlCountr--;
                if (err)
                    throw err;
                feedCount += feeds.length;
                for (var _i = 0, feeds_1 = feeds; _i < feeds_1.length; _i++) {
                    var feed_1 = feeds_1[_i];
                    _this.createArticleFromFeed(rssSource._id, feed_1, function (article) {
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
    RSSReader.prototype.createArticleFromFeed = function (source, feed, callback) {
        new htmlParser_1.HtmlParser().findThumbnailImage(feed, function (imgSrc) {
            callback(new Article({
                source: source,
                title: feed.title,
                thumbnail: imgSrc,
                link: feed.link,
                publishedDate: feed.published
            }));
        });
    };
    return RSSReader;
}());
exports.RSSReader = RSSReader;
//# sourceMappingURL=rssReader.js.map