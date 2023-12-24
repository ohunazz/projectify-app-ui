import {
    variantClassNames,
    weightClassNames,
    alignClassNames
} from "./classnames";

export const Typography = ({ variant, weight, align, className, children }) => {
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
