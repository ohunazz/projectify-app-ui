import React, { FC } from "react";
import "./Button.css";
import { trimWhiteSpaces } from "../utils";

type ButtonSize = "sm" | "md" | "lg";
type ButtonShape = "rounded" | "circle";
type ButtonColor = "primary" | "secondary" | "danger" | "success";
type ButtonVariant = "contained" | "outlined" | "text";

type ButtonProps = {
    size?: ButtonSize;
    shape?: ButtonShape;
    fullWidth?: boolean;
    color?: ButtonColor;
    variant?: ButtonVariant;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
};

const sizeClassNames = {
    sm: "btn-small",
    md: "btn-medium",
    lg: "btn-large",
};

const shapeClassNames = {
    rounded: "btn-rounded",
    circle: "btn-circle",
};

const colorClassNames = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
    success: "btn-success",
};

const variantClassNames = {
    contained: "btn-contained",
    outlined: "btn-outlined",
    text: "btn-text",
};

const Button: FC<ButtonProps> = (props) => {
    const {
        size,
        shape,
        fullWidth,
        color,
        variant,
        disabled,
        className,
        children,
        onClick,
    } = props;

    const sizeClassName = size !== undefined ? sizeClassNames[size] : "";

    const shapeClassName = shape !== undefined ? shapeClassNames[shape] : "";

    const colorClassName = color !== undefined ? colorClassNames[color] : "";

    const variantClassName =
        variant !== undefined ? variantClassNames[variant] : "";
    const fullWidthClassName = fullWidth ? "btn-full-width" : "";

    const finalClassNames = `btn ${colorClassName} ${sizeClassName} ${shapeClassName} ${fullWidthClassName} ${variantClassName} ${
        className || ""
    }`;

    return (
        <button
            className={trimWhiteSpaces(finalClassNames)}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export { Button };
