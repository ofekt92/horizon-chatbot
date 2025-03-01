export type GetSessionHistoryResponse = {
    history: ChatHistoryItem[];
};

export type ChatHistoryItem = {
    prompt: string;
    response: string;
};

export type RestartSessionResponse = {
    sessionId: string;
};

