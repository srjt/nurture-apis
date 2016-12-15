import * as express from "express";
import * as bodyParser from "body-parser"
import * as mongoose from 'mongoose'
import * as Article from './models/Article';

var app = express();
mongoose.connect("mongodb://localhost/mydb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var server = app.listen(3000, function () {
    console.log('Server listening on port 3000');
});

app.get('/api/ping',function(req, res){
	res.json(new Date().toLocaleDateString());
});
/* Create */
app.post('/api/article', function (req, res) {
    var newArticle = new Article(req.body);
    Article.save((err)=>{
        if (err){
            res.json({info: 'error during Article create', error: err});
        }
        res.json({info: 'Article saved successfully', data: newArticle}); 
    });
});

/* Read all */
app.get('/api/articles', function (req, res) {
    Article.find((err, Articles) => {
        if (err) {
            res.json({info: 'error during find Articles', error: err});
        };
        res.json({info: 'Articles found successfully', data: getTestArticles().data});
    });
});

function getTestArticles(){
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
}
}
