import { useLocation } from "wouter";
import burger from "../../assets/burger.png";

import "./header.css";

export type CustomHeaderProps = {
    toggleOpen?: () => void;
}

export function Header({ toggleOpen }: CustomHeaderProps) {
    const [, navigate] = useLocation();

    return (
        <header className="header">
            <div className="belt">
                <button className="drawer-btn" onClick={toggleOpen}>
                    <img src={burger} />
                </button>
                <h2 onClick={() => navigate("/")}>HorizonChat</h2>
            </div>
        </header>
    );
}