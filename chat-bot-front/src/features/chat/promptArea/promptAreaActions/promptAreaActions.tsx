import reset from "../../../../assets/newChat.png";
import arrowUp from "../../../../assets/arrowDown.png";
import "./promptAreaActions.css";

export type PromptAreaProps = {
    loading: boolean;
    onReset: () => Promise<void>;
};

export function PromprtAreaActions({ loading, onReset }: PromptAreaProps) {
    return (
        <div className="chat-prompt-actions-container">
            <div className="chat-prompt-actions">
                <div className="chat-prompt-actions-btns">
                    <button type="button" onClick={onReset} disabled={loading}>
                        <img src={reset} alt="reset" />
                        {/* New Chat */}
                    </button>

                    <button /* onClick={() => abortPromptResponse()} */ type="button" disabled={!loading}>
                        <div></div>
                    </button>
                </div>
                <button form="prompt-form" type="submit" className="chat-prompt-send-btn" disabled={loading}>
                    <img src={arrowUp} alt="send" />
                </button>
            </div>
        </div>
    )
}