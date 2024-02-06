import React from "react";
import "./Input.css";
import { trimWhiteSpaces } from "../utils";
import { Label } from "../Label";
import { InputProps } from "./types";

const sizeClassNames = {
    sm: "input-small",
    md: "input-medium",
    lg: "input-large"
};

const shapeClassNames = {
    rounded: "input-rounded",
    circle: "input-circle"
};

const Input: React.FC<InputProps> = (props) => {
    const {
        type,
        error,
        disabled,
        required,
        placeholder,
        shape,
        size,
        hintMessage,
        labelText,
        inputRef,
        className,
        id,
        showPassword,
        children,
        onChange,
        value
    } = props;

    const sizeClassName = size !== undefined ? sizeClassNames[size] : "";

    const shapeClassName = shape !== undefined ? shapeClassNames[shape] : "";

    const errorClassName = error ? "input-error" : "";
    const textareaClassName = type === "textarea" ? "input-textarea" : "";

    const finalClassNames = trimWhiteSpaces(
        `input ${sizeClassName} ${shapeClassName} ${errorClassName} ${textareaClassName}`
    );

    const hintMessageClass = trimWhiteSpaces(
        `hint-message ${error ? "hint-message--error" : ""}`
    );

    const handleOnChange = (
        e:
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLInputElement>
    ) => {
        onChange(e.target.value);
    };

    return (
        <div className={`input-wrapper ${className || ""} `}>
            {labelText ? (
                <Label htmlFor={id} disabled={disabled} error={error}>
                    {labelText}
                </Label>
            ) : null}

            {(() => {
                switch (type) {
                    case "textarea":
                        return (
                            <textarea
                                placeholder={placeholder}
                                className={finalClassNames}
                                required={required}
                                disabled={disabled}
                                id={id}
                                onChange={handleOnChange}
                                value={value}
                                ref={
                                    inputRef as React.LegacyRef<HTMLTextAreaElement>
                                }
                            />
                        );
                    default:
                        return (
                            <>
                                <input
                                    className={finalClassNames}
                                    type={type || "text"}
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    required={required}
                                    id={id}
                                    onChange={handleOnChange}
                                    value={value}
                                    ref={
                                        inputRef as React.LegacyRef<HTMLInputElement>
                                    }
                                />
                                {showPassword ? children : null}
                            </>
                        );
                }
            })()}

            {hintMessage ? (
                <span className={hintMessageClass}>{hintMessage}</span>
            ) : null}
        </div>
    );
};

export { Input };
