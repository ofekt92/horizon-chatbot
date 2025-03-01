import { Link } from "wouter";
import { MenuSectionProps } from "./types";

import "./menuSection.css";


export function SessionsList({ items, heading, onNavigate }: MenuSectionProps) {

    return (
        <div className="drawer-section">
            <div className="drawer-section_heading">{heading}</div>
            <ul>
                {items.map((item, index) => (
                    <li key={index} className={`link ${item.active ? 'active' : ''}`}>
                        <Link
                            to={item.navigateTo}
                            onClick={() => onNavigate(item.content)}
                        >
                            {item.content}
                        </Link>
                    </li>
                ))}
            </ul>
        </div >
    )
}