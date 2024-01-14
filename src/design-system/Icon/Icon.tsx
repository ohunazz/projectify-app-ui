import React from "react";
import sprite from "./sprite.svg";

type IconProps = {
    iconName: string;
    className?: string;
};
const Icon: React.FC<IconProps> = ({ iconName, className }) => {
    return (
        <svg height="2.4rem" width="2.4rem" className={className || ""}>
            <use xlinkHref={`${sprite}#${iconName}`} />
        </svg>
    );
};

export { Icon };
