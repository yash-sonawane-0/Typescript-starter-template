import express from "express";
import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import Container from "typedi";
import { logger } from "./util/logger";

(async () => {
    // Create Express server
    // const app = exprness();
    useContainer(Container);

    const app: any = createExpressServer({
        cors: true,
        routePrefix: "/api",
        controllers: [__dirname + "/controllers/*.js"],
        middlewares: [],
        defaultErrorHandler: false,
    });

    // Express configuration
    app.set("port", process.env.PORT || 3000);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    process.on("unhandledRejection", (error: Error) => {
        console.log(error);
        logger.error("unhandledRejection", error);
        throw error;
    });

    // handle uncaught exception
    process.on("uncaughtException", (error: Error) => {
        console.log(error);
        logger.error("uncaughtException", error);
    });

    /**
     * Start Express server.
     */
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    const server = app.listen(app.get("port"), () => {
        console.log("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
        console.log("Press CTRL-C to stop\n");
    });

    return { server, app };
})();
