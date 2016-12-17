import express = require("express");
import * as Article from "./article.lib"

let articleRouter = express.Router();
articleRouter.get('/articles', (request: express.Request, response: express.Response) => {
    response.send(Article.getAll());
});
// add more route handlers here
// e.g. articleRouter.post('/', (req,res,next)=> {/*...*/})
export = articleRouter;