import React from "react";

import {
    variantClassNames,
    weightClassNames,
    alignClassNames
} from "./classnames";

type TypographyVariant =
    | "displayLG"
    | "displaySM"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";

type TypographyWeight = "normal" | "medium" | "semibold" | "bold";

type TypographyAlign = "center" | "left" | "right" | "justify" | "inherit";

type TypographyProps = {
    variant: TypographyVariant;
    weight: TypographyWeight;
    align: TypographyAlign;
    className: string;
    children: React.ReactNode;
};

export const Typography: React.FC<TypographyProps> = ({
    variant,
    weight,
    align,
    className,
    children
}) => {
    const variantClassName = variantClassNames[variant];
    const weightClassName = weightClassNames[weight] || "";
    const alignClassName = alignClassNames[align] || "";

    const finalClassName =
        `${variantClassName} ${weightClassName} ${alignClassName} ${
            className || ""
        }`.trim();

    if (
        variant === "displayLG" ||
        variant === "displaySM" ||
        variant === "h1"
    ) {
        return <h1 className={finalClassName}>{children}</h1>;
    } else if (variant === "h2") {
        return <h2 className={finalClassName}>{children}</h2>;
    } else if (variant === "h3") {
        return <h3 className={finalClassName}>{children}</h3>;
    } else if (variant === "h4") {
        return <h4 className={finalClassName}>{children}</h4>;
    } else if (variant === "h5") {
        return <h5 className={finalClassName}>{children}</h5>;
    } else if (variant === "h6") {
        return <h6 className={finalClassName}>{children}</h6>;
    } else if (
        variant === "paragraphLG" ||
        variant === "paragraphMD" ||
        variant === "paragraphSM" ||
        variant === "subtitleLG" ||
        variant === "subtitleMD" ||
        variant === "subtitleSM"
    ) {
        return <p className={finalClassName}>{children}</p>;
    }

    return <h1>{children}</h1>;
};
