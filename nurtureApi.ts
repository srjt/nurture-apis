import express = require("express");
import requestLogger  = require("./services/requestLogger");


import articleRouter = require("./article/article.routing");

export class NurtureApi {
    /**
     * @param app - express application
     * @param port - port to listen on
     */
    constructor(private app: express.Express, private port: number) {

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
        app.use(requestLogger);
    }

    private configureRoutes(app: express.Express) {
        app.use("/api", articleRouter);
        // mount more routers here
        // e.g. app.use("/organisation", organisationRouter);
    }

    public run() {
        this.app.listen(this.port);  
    }
}