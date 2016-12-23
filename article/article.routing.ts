import express = require("express");
import { ArticleLib } from "./article.lib"
 
let articleRouter = express.Router();
let articleLib = new ArticleLib();

articleRouter.get("/articles", (request: express.Request, response: express.Response) => {
	articleLib.getAll(request.query.pageNo, request.query.pageSize).then((articles)=>{
		response.send({status: "SUCCESS", data: articles});
	},(err)=>{
		response.send({status: "ERROR", error: err});
	});
});

articleRouter.post('/article', (request: express.Request, response: express.Response)=>{
	articleLib.save(request.body).then((savedArticle)=>{
		response.send({status: "SUCCESS", article: savedArticle});
	},(err)=>{
		response.send({status: "ERROR", error: err})
	})

})
// add more route handlers here
// e.g. articleRouter.post('/', (req,res,next)=> {/*...*/})
export = articleRouter;