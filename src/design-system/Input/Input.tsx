import React from "react";
import "./Input.css";
import { trimWhiteSpaces } from "../utils";
import { Label } from "../Label";

const sizeClassNames = {
    sm: "input-small",
    md: "input-medium",
    lg: "input-large"
};

const shapeClassNames = {
    rounded: "input-rounded",
    circle: "input-circle"
};

type InputProps = {
    type?: "email" | "password" | "tel" | "textarea";
    disabled?: boolean;
    placeholder: string;
    className?: string;
    id?: string;

    error?: boolean;
    shape?: "rounded" | "circle";
    size?: "sm" | "md" | "lg";
    hintMessage?: string;
    labelText?: string;
};
const Input: React.FC<InputProps> = (props) => {
    const {
        type,
        error,
        disabled,
        placeholder,
        shape,
        size,
        hintMessage,
        labelText,
        className,
        id
    } = props;

    const sizeClassName = size !== undefined ? sizeClassNames[size] : "";

    const shapeClassName = shape !== undefined ? shapeClassNames[shape] : "";

    const errorClassName = error ? "input-error" : "";
    const textareaClassName = type === "textarea" ? "input-textarea" : "";

    const finalClassNames = trimWhiteSpaces(
        `input ${
            className || ""
        } ${sizeClassName} ${shapeClassName} ${errorClassName} ${textareaClassName}`
    );

    return (
        <div className="input-wrapper">
            {labelText ? (
                <Label htmlFor={id} disabled={disabled} error={error}>
                    {labelText}
                </Label>
            ) : null}
            {type === "textarea" ? (
                <textarea
                    placeholder={placeholder}
                    className={finalClassNames}
                    disabled={disabled}
                    id={id}
                />
            ) : (
                <input
                    className={finalClassNames}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    id={id}
                />
            )}
        </div>
    );
};

export { Input };
