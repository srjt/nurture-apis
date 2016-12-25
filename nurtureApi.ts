import express = require("express");
import bodyParser = require("body-parser");
import requestLogger  = require("./services/requestLogger");

import  * as articleRouter  from  "./article/article.routing";
import  * as sourceRouter  from  "./source/source.routing";
import  * as crawlerRouter  from  "./crawler/crawler.routing";

import https = require("https");

export class NurtureApi {
    /**
     * @param app - express application
     * @param port - port to listen on
     */
    constructor(private app: express.Express, private port: number, private portSsl: number) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
        
        app.get("/api/ping",(request: express.Request, response: express.Response) => {
            response.send(new Date());
        });
    }

    /** 
     * @param app - express application
     */
    private configureMiddleware(app: express.Express) {
        app.use(bodyParser.json());
        app.use(requestLogger);
    }

    private configureRoutes(app: express.Express) {
        app.use("/api", articleRouter);
        app.use("/api", sourceRouter);
        app.use("/api", crawlerRouter);
    }

    public run() {
        this.app.listen(this.port);  
        console.info(`listening on ${this.port}`);
    }
    public runHttps(key, cert){
        let credentails = {key: key, cert: cert, passphrase: "nurture!23"};
        https.createServer(credentails, this.app).listen(this.portSsl);
        console.info(`listening on ${this.portSsl}`);
    }
}