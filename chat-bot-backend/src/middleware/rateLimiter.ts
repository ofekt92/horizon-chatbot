import { rateLimit } from "express-rate-limit";
import type { Request } from "express";


const rateLimiter = rateLimit({
    legacyHeaders: true,
    limit: +(process.env.COMMON_RATE_LIMIT_MAX_REQUESTS || 400), // TODO return to 20.
    message: "Rate Limiter Error.",
    standardHeaders: true,
    windowMs: 15 * 60 * +(process.env.COMMON_RATE_LIMIT_WINDOW_MS || 1000),
    keyGenerator: (req: Request) => req.ip as string
});

export default rateLimiter;
