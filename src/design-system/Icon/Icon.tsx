import React from "react";
import sprite from "./sprite.svg";
import { IconProps } from "./types";

const Icon: React.FC<IconProps> = ({ iconName, className, onClick }) => {
    const handleOnClick = () => {
        onClick && onClick();
    };
    return (
        <svg
            height="2.4rem"
            width="2.4rem"
            className={className || ""}
            onClick={handleOnClick}
        >
            <use xlinkHref={`${sprite}#${iconName}`} />
        </svg>
    );
};

export { Icon };
