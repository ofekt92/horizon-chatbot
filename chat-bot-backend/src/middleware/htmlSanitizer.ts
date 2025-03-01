import sanitizeHtml from "sanitize-html";
import { Request, Response, NextFunction } from "express";

export async function sanitizeHtmlMiddleware(req: Request, res: Response, next: NextFunction) {
    // TODO add more sanitizations?
    if (req.body.prompt) {
        console.log("Sanitizing prompt");
        req.body.prompt = sanitizeHtml(req.body.prompt);
    }
    next();
}
