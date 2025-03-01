import { ZodError, ZodSchema } from "zod";
import type { NextFunction, Request, Response } from "express";

export const validateRequest = (schema: ZodSchema) => async ({ body, query, params }: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            ...body,
            ...query,
            ...params
        });
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
            res.status(400).send(errorMessage);
        }
        next(err);
    }
};
