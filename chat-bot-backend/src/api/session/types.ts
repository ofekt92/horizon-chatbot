import { z } from 'zod';

export type SessionHistoryResponse = {
    history: ChatMessage[];
};

export type ChatMessage = {
    prompt?: string;
    response?: string;
};

export const getSessionHistoryRequestSchema = z.object({
    sessionId: z.string().uuid()
});
