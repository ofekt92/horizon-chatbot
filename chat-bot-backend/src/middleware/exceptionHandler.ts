import { Request, Response, NextFunction } from 'express';
import { SessionNotFoundError } from '../models/errors.js';

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    console.error("Failed to call ", req.url);
    console.error("in error handler", error.message);

    if (error instanceof SessionNotFoundError) {
        console.log("Session not found.");
        res.status(404).send(error.message);
        return;
    }

    const msg = /* process.env.ENV === "development" ? error.message : */ "An error occurred!";
    res.status(500).send(msg);
    next();
}
