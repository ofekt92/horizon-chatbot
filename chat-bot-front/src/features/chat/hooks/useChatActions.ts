import { useCallback, useEffect, useRef, useState } from "react";
import { useStreaming, useHttp } from "../../../hooks";
import { useParams } from "wouter";

import { validateChatRequestSchema } from "../validations";
import { RestartSessionResponse } from "../types/session.types";
import { ChatRequest } from "../types/chat.types";


export type PromptToAnswers = {
    prompt: string;
    answers: string[];
};

export function useChatActions() {
    const { sessionId = "" } = useParams();

    const answersCount = useRef<number>(0);

    const [prompts, setPrompts] = useState<string[]>([]);
    const [answers, setAnswers] = useState<string[][]>([]);
    const [error, setError] = useState<string | undefined>(undefined);

    const { postAsStream } = useStreaming();
    const { post } = useHttp();

    useEffect(() => {
        setAnswers([]);
        setPrompts([]);
        setError(undefined);
        answersCount.current = 0;
    }, [sessionId]);


    const startNewChat = useCallback(async () => {
        setAnswers([]);
        answersCount.current = 0;

        const newSessionId = await post<RestartSessionResponse>("/session/create", { sessionId });
        return newSessionId;
    }, [sessionId]);




    const onSubmit = useCallback(async (prompt: string, signal?: AbortSignal) => {
        if (!sessionId && !error) {
            throw new Error("Session ID is missing");
        }

        setPrompts(prev => [...prev, prompt]);

        try {
            const request = { prompt, sessionId, signal } satisfies ChatRequest

            const isValid = await validateChatRequestSchema.safeParseAsync(request)

            if (isValid.error) {
                setError(isValid.error.message); // TODO remove, only for debugging
                return;
            }

            await postAsStream("/chatbot/prompt", request, addChunk);
            answersCount.current += 1;

        } catch (error) {
            if (error instanceof Error) {
                return setError(error.message);
            }
            setError("An error occurred");
        }
    }, [sessionId]);


    function addChunk(chunk: string) {
        setAnswers(prev => {
            const newAnswers = [...prev];
            const shouldCreateNewAnswerArray = newAnswers.length === 0 || newAnswers.length < answersCount.current + 1;

            if (shouldCreateNewAnswerArray) {
                newAnswers.push([chunk]);
                return newAnswers;
            }
            newAnswers[newAnswers.length - 1] = [...newAnswers[newAnswers.length - 1], chunk];
            return newAnswers;
        })
    }

 

    return {
        answers,
        prompts,
        error,
        onSubmit,
        startNewChat,
    }
}