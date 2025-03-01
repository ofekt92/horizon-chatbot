import { LlamaChatSession } from 'node-llama-cpp';
import { v4 as uuid } from 'uuid';

import { context, initSession } from '../../chatbot.js';
import { sessions } from '../../index.js';
import { ChatMessage } from './types.js';


export const getSession = (sessionId: string) => sessions.get(sessionId);


export function createSession(): [string, LlamaChatSession] {
    const sessionId = uuid();
    const session = initSession(context);
    sessions.set(sessionId, session);

    return [sessionId, session];
};


export async function getSessionHistory(sessionId: string) {
    const session = getSession(sessionId);

    if (!session) {
        return null;
    }

    const chatHistory = session.getChatHistory();

    const historyRecords: ChatMessage[] = [];
    for (let index = 0; index < chatHistory.length; index++) {
        const item = chatHistory[index];

        if (item.type === "system") {
            continue;
        }

        if (item.type === "user") {
            historyRecords.push({ prompt: item.text });
        }

        if (item.type === "model") {
            const lastElement = historyRecords[historyRecords.length - 1];
            lastElement.response = item.response.toString();
        }
    }


    return historyRecords;
}


export function deleteAllSessions() {
    sessions.forEach((session) => {
        session.dispose({ disposeSequence: true });
    });

    sessions.clear();
}
