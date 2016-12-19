"use strict";
var ArticleLib = (function () {
    function ArticleLib() {
    }
    ArticleLib.prototype.getAll = function () {
        return this.getTestArticles().data;
        // return  Article.find(()=>{});
    };
    ArticleLib.prototype.getTestArticles = function () {
        return {
            "data": [{
                    "picUrl": "http://www.brainy-child.com/images/0553378252.jpg",
                    "title": "First Article",
                    "url": "http://www.brainy-child.com/article/develop-creativity.shtml"
                }, {
                    "picUrl": "https://images.contentful.com/6m9bd13t776q/1toH97QC6go6mWw2suIg46/189821a35ba98845e35a9fb937d7a7b2/Mom_and_baby?q=75",
                    "title": "The Top 3 Lies People Told Me About Having a Baby — and One Truth",
                    "url": "http://www.thebump.com/a/the-top-3-lies-people-told-me-about-having-a-baby-and-one-truth"
                }, {
                    "picUrl": "pic 3",
                    "title": "Stimulating Your Child's Creativity",
                    "url": "http://www.brainy-child.com/article/child-creativity.shtml"
                },
                {
                    "picUrl": "http://www.brainy-child.com/images/0553378252.jpg",
                    "title": "creativity for kid: Can creativity be taught?",
                    "url": "http://www.brainy-child.com/article/develop-creativity.shtml"
                }, {
                    "picUrl": "https://images.contentful.com/6m9bd13t776q/1toH97QC6go6mWw2suIg46/189821a35ba98845e35a9fb937d7a7b2/Mom_and_baby?q=75",
                    "title": "The Top 3 Lies People Told Me About Having a Baby — and One Truth",
                    "url": "http://www.thebump.com/a/the-top-3-lies-people-told-me-about-having-a-baby-and-one-truth"
                }, {
                    "picUrl": "pic 3",
                    "title": "Stimulating Your Child's Creativity",
                    "url": "http://www.brainy-child.com/article/child-creativity.shtml"
                },
                {
                    "picUrl": "http://www.brainy-child.com/images/0553378252.jpg",
                    "title": "creativity for kid: Can creativity be taught?",
                    "url": "http://www.brainy-child.com/article/develop-creativity.shtml"
                }, {
                    "picUrl": "https://images.contentful.com/6m9bd13t776q/1toH97QC6go6mWw2suIg46/189821a35ba98845e35a9fb937d7a7b2/Mom_and_baby?q=75",
                    "title": "The Top 3 Lies People Told Me About Having a Baby — and One Truth",
                    "url": "http://www.thebump.com/a/the-top-3-lies-people-told-me-about-having-a-baby-and-one-truth"
                }, {
                    "picUrl": "pic 3",
                    "title": "Stimulating Your Child's Creativity",
                    "url": "http://www.brainy-child.com/article/child-creativity.shtml"
                },
                {
                    "picUrl": "http://www.brainy-child.com/images/0553378252.jpg",
                    "title": "creativity for kid: Can creativity be taught?",
                    "url": "http://www.brainy-child.com/article/develop-creativity.shtml"
                }, {
                    "picUrl": "https://images.contentful.com/6m9bd13t776q/1toH97QC6go6mWw2suIg46/189821a35ba98845e35a9fb937d7a7b2/Mom_and_baby?q=75",
                    "title": "The Top 3 Lies People Told Me About Having a Baby — and One Truth",
                    "url": "http://www.thebump.com/a/the-top-3-lies-people-told-me-about-having-a-baby-and-one-truth"
                }, {
                    "picUrl": "pic 3",
                    "title": "Last title",
                    "url": "http://www.brainy-child.com/article/child-creativity.shtml"
                }]
        };
    };
    return ArticleLib;
}());
exports.ArticleLib = ArticleLib;
//export = articleLib; 
//# sourceMappingURL=article.lib.js.map