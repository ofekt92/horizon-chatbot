export type ChatRequest = { // TODO move to types.ts
    prompt: string;
    sessionId: string;
    signal?: AbortSignal;
};