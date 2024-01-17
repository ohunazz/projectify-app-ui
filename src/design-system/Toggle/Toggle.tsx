import React from "react";
import "./Toggle.css";
import { trimWhiteSpaces } from "../utils";

interface ToggleProps {
    value: boolean;
    className?: string;
    rounded?: boolean;
    onToggle: (value: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({
    value,
    onToggle,
    rounded,
    className,
}) => {
    const handleOnClick = () => {
        onToggle(!value);
    };

    const trackClassNames = trimWhiteSpaces(
        `toggle__track ${value ? "toggle__track--on" : ""} ${
            rounded ? "toggle__track--round" : ""
        }${className ? className : ""}`
    );
    const thumbClassNames = trimWhiteSpaces(
        `toggle__thumb ${value ? "toggle__thumb--on" : ""} ${
            rounded ? "toggle__thumb--round" : ""
        }`
    );
    return (
        <div className={trackClassNames} onClick={handleOnClick}>
            <div className={thumbClassNames}></div>
        </div>
    );
};

export { Toggle };
