"use strict";
var cheerio = require("cheerio");
var request = require("request");
var HtmlParser = (function () {
    function HtmlParser() {
    }
    HtmlParser.prototype.findThumbnailImage = function (feed, callback) {
        var _this = this;
        var parsedHTML = cheerio.load(feed.content);
        var images = parsedHTML("img");
        this.selectSpecificThumbnail(images, feed.link, callback, function () {
            _this.loadFromUrl(feed.link, callback, function (err) {
                console.log(err);
                callback('');
            });
        });
    };
    HtmlParser.prototype.loadFromUrl = function (url, callback, error) {
        var _this = this;
        request({ url: url, timeout: 500 }, function (err, response, html) {
            if (err) {
                console.log(err);
            }
            if (!err && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var images = $("body img");
                _this.selectSpecificThumbnail(images, url, callback, error);
            }
            else {
                error("No image found on url " + url);
            }
        });
    };
    HtmlParser.prototype.selectSpecificThumbnail = function (images, url, callback, error) {
        var thumbnailSrc = '';
        if (images.length > 0) {
            for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
                var img = images_1[_i];
                if (this.isImgOnSameDomain(img.attribs.src, url)) {
                    thumbnailSrc = this.cleanUpImageSrc(img.attribs.src);
                    break;
                }
            }
        }
        if (thumbnailSrc.length > 0) {
            callback(thumbnailSrc);
        }
        else {
            error("No image found in list");
        }
    };
    //Sometime src starts with '//'
    HtmlParser.prototype.cleanUpImageSrc = function (url) {
        if (url.indexOf("//") == 0) {
            url = "https:" + url;
        }
        return url;
    };
    HtmlParser.prototype.isImgOnSameDomain = function (imgSrc, url) {
        var result = imgSrc &&
            imgSrc.indexOf(this.getDomainNameFromUrl(url)) >= 0 &&
            !this.isAvatarImg(imgSrc);
        return result;
    };
    HtmlParser.prototype.isAvatarImg = function (imgSrc) {
        var avatarUrl = "gravatar";
        return imgSrc.indexOf(avatarUrl) >= 0;
    };
    HtmlParser.prototype.getDomainNameFromUrl = function (url) {
        var domain;
        var match = url.match(/(www)?([0-9]?\.)\w?(.[^%/:]+)/i);
        if (Array.isArray(match) && match.length > 0) {
            domain = match[0];
        }
        return domain;
    };
    return HtmlParser;
}());
exports.HtmlParser = HtmlParser;
//# sourceMappingURL=htmlParser.js.map