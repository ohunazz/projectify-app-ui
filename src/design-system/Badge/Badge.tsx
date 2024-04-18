import { FC } from "react";
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
    const { label, shape, color, variant, status, iconName, className } = props;

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
            {!status && iconName ? <Icon iconName={iconName} /> : null}
            {status && !iconName ? <div className="badge__status" /> : null}
            <span className="badge__text">{label}</span>
        </div>
    );
};

export { Badge };
