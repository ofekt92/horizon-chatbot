import express from "express";
import { validateRequest } from "../../middleware/requestValidator.js";
import { createSession, deleteAllSessions, getSession, getSessionHistory } from "./session.service.js";
import { getSessionHistoryRequestSchema } from "./types.js";
export const sessionRouter = express.Router();


sessionRouter.post("/create", async (_req, res, next) => {
    try {
        const [sessionId] = createSession();
        res.json({ sessionId });
    } catch (error) {
        next(error);
    }
});

sessionRouter.get("/getSessionHistory", validateRequest(getSessionHistoryRequestSchema), async (req, res) => {
    const { sessionId } = req.query;
    const session = getSession(sessionId as string);

    if (!session) {
        res.status(404).send("Session not found");
        return;
    }

    const history = await getSessionHistory(sessionId as string);
    console.log(history);
    res.status(200).json({ history });
});


sessionRouter.post("/deleteAll", (req, res, next) => {
    try {
        deleteAllSessions();
        res.status(200).json({ message: "All sessions deleted" });
    } catch (error) {
        next(error);
    }
});
