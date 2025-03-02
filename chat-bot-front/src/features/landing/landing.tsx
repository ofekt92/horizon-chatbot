import { useLocation } from "wouter";
import "./landing.css";
import { useState } from "react";
import { Button } from "../../components/button/button";
import { useSessionsPersistence } from "../../context/sessionsPersistenceContext";
import { useHttp } from "../../hooks";
import { SlidingAnimation } from "../../components/slideAnimation/slideAnimation";

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

          } catch (error: unknown) {
            console.error(error)
            setError("An error occurred. Please try again later.");
        }
    }

    return (
        <section className="landing">
            <div>
                <SlidingAnimation delay={150}>
                    <h1>Welcome To Horizon AI Chatbot</h1>
                    <h2>This is the first AI Chatbot I had the pleasure of developing!</h2>
                    <p>I hope you enjoy your time here</p>
                    {/* <h2></h2> */}
                </SlidingAnimation>
            </div>
            <SlidingAnimation delay={300}>
                <div className="landing-button-container">
                    <Button onClick={startChat}>Start!</Button>
                </div>
                {error && <p className="landing-error">{error}</p>}
            </SlidingAnimation>
        </section>
    )
}
