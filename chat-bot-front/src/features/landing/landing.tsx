import { useLocation } from "wouter";
import "./landing.css";
import { useState } from "react";
import { Button } from "../../components/button/button";
import { useSessionsPersistence } from "../../context/sessionsPersistenceContext";
import { useHttp } from "../../hooks";

export function Landing() {
    const { post } = useHttp();
    const [, navigate] = useLocation();
    const [error, setError] = useState<string | null>(null);
    const { addSession } = useSessionsPersistence();

    async function startChat() {

        try {
            const response = await post<{ sessionId: string }>("/session/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const { sessionId } = response;

            addSession(sessionId);
            navigate(`/chat/${sessionId}`);

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error occurred");
            }
        }
    }

    return (
        <section className="landing">
            <div>
                <h1>Welcome To Horizon AI Chatbot</h1>
                <h2>This is the first AI Chatbot I had the pleasure of developing!</h2>
                <p>I hope you enjoy your time here</p>
                {/* <h2></h2> */}
            </div>
            <div className="landing-button-container">
                <Button onClick={startChat}>Start!</Button>
            </div>
            {error && <p className="landing-error">{error}</p>}
        </section>
    )
}