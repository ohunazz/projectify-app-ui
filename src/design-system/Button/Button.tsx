import { FC } from "react";
import { trimWhiteSpaces } from "../utils";
import {
    sizeClassNames,
    shapeClassNames,
    colorClassNames,
    variantClassNames
} from "./classnames";
import { ButtonProps } from "./types";
import "./Button.css";

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
        buttonRef
    } = props;

    const sizeClassName = size !== undefined ? sizeClassNames[size] : "";

    const shapeClassName = shape !== undefined ? shapeClassNames[shape] : "";

    const colorClassName = color !== undefined ? colorClassNames[color] : "";

    const variantClassName =
        variant !== undefined ? variantClassNames[variant] : "";

    const fullWidthClassName = fullWidth ? "btn-full-width" : "";

    const finalClassNames = trimWhiteSpaces(
        `btn ${colorClassName} ${sizeClassName} ${shapeClassName} ${fullWidthClassName} ${variantClassName} ${
            className || ""
        }`
    );

    return (
        <button
            className={trimWhiteSpaces(finalClassNames)}
            disabled={disabled}
            onClick={onClick}
            ref={buttonRef}
        >
            {children}
        </button>
    );
};

export { Button };
