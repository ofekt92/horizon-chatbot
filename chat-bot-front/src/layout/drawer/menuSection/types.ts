
export type MenuSectionProps = {
    heading: string;
    onNavigate: (sessionId: string) => void;
    items: Array<{
        content: string;
        navigateTo: string;
        active: boolean;
    }>;
};