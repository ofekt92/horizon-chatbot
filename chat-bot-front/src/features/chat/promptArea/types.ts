export type PromptAreaProps = {
    error?: string;
    onSubmit: (prompt: string) => Promise<void>;
    onReset: () => Promise<void>;
};