import express = require("express");
import { SourceLib } from "./source.lib"

let sourceRouter = express.Router();
let sourceLib = new SourceLib();

sourceRouter.get("/sources", (request: express.Request, response: express.Response) => {
	sourceLib.getAll().then((sources)=>{
		response.send({status: "SUCCESS", data: sources});
	},(err)=>{
		response.send({status: "ERROR", error: err});
	})
});

sourceRouter.post("/source", (request: express.Request, response: express.Response)=>{
	sourceLib.save(request.body).then((savedSource)=>{
		response.send({status: "SUCCESS", source: savedSource});
	},(err)=>{
		response.send({status: "ERROR", error: err})
	})
})
export = sourceRouter;