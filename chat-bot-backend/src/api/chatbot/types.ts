import { z } from 'zod';

export type PromptResponse = {
    text: string;
};

export type PromptRequest = z.infer<typeof promptRequestSchema>;

export const promptRequestSchema = z.object({
    prompt: z.string().max(1000),
    sessionId: z.string().uuid(),
    signal: z.any().optional()
});


export type RestartRequest = z.infer<typeof restartRequestSchema>;
export const restartRequestSchema = z.object({
    sessionId: z.string().uuid()
});

