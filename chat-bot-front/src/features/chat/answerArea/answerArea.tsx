import { memo, useRef } from "react";
import arrowDown from "../../../assets/arrowDown.png"
import "./answerArea.css";
import { ChatHistoryItem } from "../types/session.types";

export type PromptAreaProps = {
    answers: string[][];
    chatHistory: ChatHistoryItem[];
    error?: string;
    prompts: string[];
};

export const AnswerArea = memo(function AnswerArea({ answers, error, prompts, chatHistory = [] }: PromptAreaProps) {
    const textAreaRef = useRef<HTMLDivElement>(null);

    return (
        <section className="chat-area-container">
            <div className="chat-area">

                {(answers.length === 0 && chatHistory.length === 0)
                    ? <div>Type something to start chatting...</div>
                    :
                    <>
                        <div className="chat-history">
                            {chatHistory.map((message, messageIndex) => (
                                <div className="chat-history-item" key={messageIndex}>
                                    <div className="chat-history-user">{message.prompt}</div>
                                    <div className="chat-history-content" ref={answers.length === 0 ? textAreaRef : null}>{message.response}</div>
                                </div>
                            ))}
                        </div>
                        {
                            answers.map((answer, answerIndex, arr) => (
                                <div className="chat-item" key={answerIndex}>
                                    <div className="chat-prompt">
                                        {prompts[answerIndex]}
                                    </div>
                                    <div className="chat-answer" ref={answerIndex === arr.length - 1 ? textAreaRef : null}>
                                        {answer.reduce((acc, curr) => acc + curr, "")}
                                    </div>
                                </div>
                            ))
                        }
                    </>
                }
                {error && <div className="chat-error">{error}</div>}
            </div>
            <div className="chat-area-goto-bottom-btn" >
                <button onClick={() => textAreaRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })}>
                    <img src={arrowDown} />
                </button>
            </div>
        </section >
    )
});