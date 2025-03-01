import express from "express";
import { validateRequest } from "../../middleware/requestValidator.js";
import { getSession } from "../session/session.service.js";
import { SessionNotFoundError } from "../../models/errors.js";
import { promptRequestSchema } from "./types.js";

export const chatbotRouter = express.Router();

const abortController = new AbortController();
const signal = abortController.signal;

chatbotRouter.post("/prompt", validateRequest(promptRequestSchema), async (req, res, next) => {
    const { prompt, sessionId } = req.body;


    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    try {
        const session = getSession(sessionId);

        if (!session) {
            throw new SessionNotFoundError();
        }


        await session.prompt(prompt, {
            onTextChunk(text) {
                res.write(text);
            },
            signal,
            stopOnAbortSignal: true
        });

        req.on("close", () => abortController.abort());

        res.end();
        res.on("close", () => {
            console.log("Request closed");
        });
    } catch (error) {
        next(error);
    }
});

