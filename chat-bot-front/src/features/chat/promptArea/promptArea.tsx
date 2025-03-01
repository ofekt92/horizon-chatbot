import { FormEvent, memo, useState } from "react";
import { Input } from "../../../components/input/input";

import type { PromptAreaProps } from "./types";
import { PromprtAreaActions } from "./promptAreaActions/promptAreaActions";
import "./promptArea.css";

export const PromptArea = memo(function PromptArea({ onSubmit, error, onReset }: PromptAreaProps) {
    const [prompt, setPrompt] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


    async function submitForm(formEvent: FormEvent) {
        formEvent.preventDefault();
        setLoading(true);

        await onSubmit(prompt);

        setPrompt("");
        setLoading(false);
    }

    async function resetHandler() {
        setPrompt("");
        setLoading(true);

        await onReset();

        setLoading(false);
    }

    return (
        <div className="chat-prompt-container">
            <form id="prompt-form" onSubmit={submitForm} noValidate >
                <Input
                    name="prompt"
                    // autoFocus
                    label="Ask anything"
                    value={prompt}
                    onChange={value => setPrompt(value)}
                    error={!!error}
                    errorText={error ?? ""}
                />
                <PromprtAreaActions loading={loading} onReset={resetHandler} />
            </form>
        </div>
    );
});