import express = require("express");
import { SourceLib } from "./source.lib"

let sourceRouter = express.Router();
let sourceLib = new SourceLib();

sourceRouter.get('/sources', (request: express.Request, response: express.Response) => {
	sourceLib.getAll((sources)=>{
		response.send({info: 'Sources found successfully', data: sources});
	},(err)=>{
		response.send({info: 'Erro getting Sources', error: err});
	});
});

sourceRouter.post('/source', (request: express.Request, response: express.Response)=>{
	console.log(request.body);
 	sourceLib.save(request.body, (savedSource)=>{
		response.send({info: 'Source saved successfully', source: savedSource});
	},(err)=>{
		response.send({info: 'Error saving Source', error: err})
	});
})
export = sourceRouter;