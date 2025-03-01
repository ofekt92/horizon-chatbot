import classNames from "classnames";
import "./button.css";

export type ButtonProps = {
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
};

export function Button({
    children,
    onClick,
    loading = false,
    disabled = false,
    type = "button"
}: ButtonProps) {

    const btnClasses = classNames("button", {
        disabled,
        loading,
    });

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={btnClasses}
        >
            {loading ? <div>Loading...</div> : children}
        </button>
    )

}