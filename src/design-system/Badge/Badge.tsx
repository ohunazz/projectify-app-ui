import React, { FC } from "react";
import { trimWhiteSpaces } from "../utils";
import {
    colorClassNames,
    shapeClassNames,
    variantClassNames
} from "./classnames";
import "./Badge.css";
import { Icon } from "../Icon";
import { BadgeProps } from "./types";

const Badge: FC<BadgeProps> = (props) => {
    const { label, shape, color, variant, status, icon, iconName, className } =
        props;

    const shapeClassName = shape !== undefined ? shapeClassNames[shape] : "";
    const colorClassName = color !== undefined ? colorClassNames[color] : "";
    const variantClassName =
        variant !== undefined ? variantClassNames[variant] : "";

    const finalClassNames = trimWhiteSpaces(
        `badge ${colorClassName} ${shapeClassName} ${variantClassName} ${
            className || ""
        }`
    );

    return (
        <div className={trimWhiteSpaces(finalClassNames)}>
            {icon && !status && !iconName ? icon : null}
            {iconName && !status && !icon ? <Icon iconName={iconName} /> : null}
            {status && !icon && !iconName ? (
                <div className="badge__status" />
            ) : null}
            <span className="badge__text">{label}</span>
        </div>
    );
};

export { Badge };
