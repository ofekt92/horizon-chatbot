import { createPortal } from "react-dom";
import { useLocation } from "wouter";
import { useSessionsPersistence } from "../../context/sessionsPersistenceContext";
import { SessionsList } from "./menuSection/menuSection";
import type { MenuProps } from "./types";
import "./drawer.css"
import { useHttp } from "../../hooks";

export function DrawerMenu({ isOpen, toggleOpen }: MenuProps) {
    const { post } = useHttp();
    const [, navigate] = useLocation();
    const { sessions, changeSession, deleteAllSessions } = useSessionsPersistence();


    async function onDeleteSessions() {
        await post("/session/deleteAll");
        toggleOpen();
        deleteAllSessions();
        navigate("/");
    }

    function onSessionClicked(sessionId: string) {
        toggleOpen();
        changeSession(sessionId);
        navigate(`/chat/${sessionId}`);
    }

    const sessionItems = sessions?.map(session => ({
        content: session.sessionId,
        navigateTo: `/chat/${session.sessionId}`,
        active: session.isActive
    }));

    return (
        <div className={`drawer ${isOpen ? 'open' : ''}`}>
            {isOpen &&
                createPortal(
                    <div className="backdrop visible" onClick={toggleOpen}></div>,
                    document.body
                )}
            <menu id='drawer__menu'>
                <SessionsList heading="Sessions" items={sessionItems} onNavigate={onSessionClicked} />
                <div className="drawer-delete">
                    <button
                        onClick={onDeleteSessions}
                        disabled={sessionItems.length === 0}
                        className={`drawer-delete-btn ${sessionItems.length === 0 ? 'disabled' : ''}`}>Delete All Sessions</button>
                </div>
            </menu>
        </div>
    )
}


