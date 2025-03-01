import { createContext, useState, useContext, ReactNode, } from 'react';
import { Session } from '../types';

type SessionsContextType = {
    sessions: Session[];
    addSession: (sessionId: string) => void;
    changeSession: (sessionId: string) => void;
    deleteAllSessions: () => void;
}

const STORAGE_KEY = 'chat-sessions';
const SessionsContext = createContext<SessionsContextType | undefined>(undefined);

export function SessionsPersistenceProvider({ children }: { children: ReactNode }) {
    const [sessions, setSessions] = useState<Session[]>(parseSessionFromStorage());

    function addSession(sessionId: string) {
        if (sessions.find(s => s.sessionId === sessionId)) {
            console.warn("Session already exists.");
            return;
        }

        const newSessionsState = sessions.map(session => {
            return {
                ...session,
                isActive: false
            }
        });
        newSessionsState.push({ sessionId, isActive: true });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSessionsState));
        setSessions(newSessionsState);
    }

    async function changeSession(newSessionId: string) {

        const newSessions = sessions.map(session => {
            if (session.sessionId === newSessionId) {
                return {
                    ...session,
                    isActive: true,
                }
            }
            return {
                ...session,
                isActive: false
            }
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions));
        setSessions(newSessions);
    }

    function deleteAllSessions() {
        localStorage.removeItem(STORAGE_KEY);
        setSessions([]);
    }

    return (
        <SessionsContext.Provider value={{ sessions, addSession, changeSession, deleteAllSessions }}>
            {children}
        </SessionsContext.Provider>
    );
};


export function useSessionsPersistence(): SessionsContextType {
    const context = useContext(SessionsContext);

    if (!context) {
        throw new Error('useSessions must be used within a SessionsProvider');
    }

    return context;
};

function parseSessionFromStorage(): Session[] {
    const sessions = localStorage.getItem(STORAGE_KEY);
    return sessions ? JSON.parse(sessions) : [];
}