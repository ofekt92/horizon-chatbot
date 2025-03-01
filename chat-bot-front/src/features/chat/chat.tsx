import { useCallback } from "react";
import { useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";

import { useHttp } from "../../hooks";
import { useChatActions } from "./hooks/useChatActions";
import { useSessionsPersistence } from "../../context/sessionsPersistenceContext";

import { PromptArea } from "./promptArea/promptArea";
import { AnswerArea } from "./answerArea/answerArea";

import type { GetSessionHistoryResponse } from "./types/session.types";
import "./chat.css"

export function Chat() {
    const { get } = useHttp();
    const { sessionId } = useParams();
    const [, navigate] = useLocation();
    const { addSession } = useSessionsPersistence();
    const { prompts, answers, error, onSubmit, startNewChat } = useChatActions();

    const { data, isLoading } = useQuery({
        queryKey: ['sessionHistory', sessionId],
        queryFn: async () => await get<GetSessionHistoryResponse>(`/session/getSessionHistory?sessionId=${sessionId}`),
        staleTime: 1000 * 3,
        retry: false,
        refetchOnMount: true,
    });

    const onStartNewChant = useCallback(async () => {
        const { sessionId: newSessionId } = await startNewChat();

        addSession(newSessionId);
        navigate(`/chat/${newSessionId}`);
    }, [sessionId]);


    if (!sessionId) {
        navigate("/404");
        return null;
    }

    if (isLoading) {
        return <div>Loading...</div> // TODO add loading spinner
    }

    return (
        <section className="chat">
            <AnswerArea answers={answers} chatHistory={data?.history ?? []} error={error} prompts={prompts} />
            <PromptArea onSubmit={onSubmit} error={error} onReset={onStartNewChant} />
        </section>
    )
}

