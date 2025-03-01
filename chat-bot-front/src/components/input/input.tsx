import { useState } from "react";
import "./input.css";

export type InputProps = {
    type?: "text" | "password" | "tel" | "email" | "num";
    label: string;
    error?: boolean;
    errorText?: string;
    ref?: React.Ref<HTMLInputElement>;
    onChange?: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder" | "onChange" | "error">;

export function Input({
    label,
    value,
    onChange,
    ...other
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    const handleFocus = () => setIsFocused(true);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        setHasValue(!!e.target.value);
    };

    delete other.errorText;

    return (
        <div className="input-container">
            <label className={`input-label ${isFocused || hasValue ? "focused" : ""}`}>
                {label}
            </label>
            <input
                type={other.type ?? "text"}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                {...other}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {(other.error && other.errorText) && <p className="input-error">{other.errorText}</p>}
        </div>
    )
}