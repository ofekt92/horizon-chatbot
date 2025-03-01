import express from "express";
import cors from "cors";
import { LlamaChatSession } from "node-llama-cpp";
import { errorHandler } from "./middleware/exceptionHandler.js";
import { sessionRouter } from "./api/session/session.router.js";
import { chatbotRouter } from "./api/chatbot/chatbot.router.js";
import rateLimiter from "./middleware/rateLimiter.js";
import { model } from "./chatbot.js";
import { sanitizeHtmlMiddleware } from "./middleware/htmlSanitizer.js";

export type Session = {
    id: string
};

export const sessions = new Map<string, LlamaChatSession>();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(rateLimiter);

app.use("/api/session", sessionRouter);
app.use("/api/chatbot", sanitizeHtmlMiddleware, chatbotRouter);

app.use(errorHandler);

const port = 3000;

const server = app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server running on port ${port}`);
    }
});

const onCloseSignal = () => {
    console.log("sigint received, shutting down");
    server.close(() => {
        if (!model.disposed) {
            console.log("disposing model.");
            model.dispose();
        }
        console.log("server closed");
        process.exit();
    });
    setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);