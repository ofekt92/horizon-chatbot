import { z } from 'zod';

export const validateChatRequestSchema = z.object({
    prompt: z.string().max(1000).nonempty(),
});