import { BASE_URL } from "../utils/constants";

export function useStreaming() {

    async function postAsStream(endpoint: string, body: Record<string, unknown>, onDecodedValue?: (value: string) => void) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok || !response.body) {
            throw new Error("An error occurred");
        }
        await streamResponse(response.body, onDecodedValue);
        
    }

    async function getAsStream(endpoint: string, onDecodedValue?: (value: string) => void) {
        const response = await fetch(`${BASE_URL}${endpoint}`);

        if (!response.ok || !response.body) {
            throw new Error("An error occurred");
        }
        await streamResponse(response.body, onDecodedValue);
    }

    return {
        postAsStream,
        getAsStream
    }

}


async function streamResponse(stream: ReadableStream<Uint8Array<ArrayBufferLike>>, onDecodedValue?: (value: string) => void) {
    const reader = stream.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        const decodedValue = decoder.decode(value);
        onDecodedValue?.(decodedValue);
    }
}