import { BASE_URL } from "../utils/constants";

export function useHttp() {

    async function get<T>(url: string): Promise<T> {
        const response = await fetch(`${BASE_URL}${url}`);

        if (!response.ok) {
            throw new Error("An error occurred");
        }

        return await response.json();
    }

    async function post<T>(url: string, body?: Record<string, unknown>): Promise<T> {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("An error occurred");
        }

        return await response.json();
    }

    return {
        get,
        post,
    }
}