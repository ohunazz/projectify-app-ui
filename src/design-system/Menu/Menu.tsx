import React, { useState, useRef, useEffect } from "react";
import { MenuProps } from "./types";
import "./Menu.css";
import { Icon } from "../Icon";
import { trimWhiteSpaces } from "../utils";
import { useCloseWhenClickOutside } from "../hooks";

const colorClassNames = {
    primary: "menu__option--primary",
    danger: "menu__option--danger"
};

const Menu: React.FC<MenuProps> = ({
    options,
    onSelect,
    customTrigger,
    className
}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const { show, setShow } = useCloseWhenClickOutside(menuRef);

    const handleOnSelect = (value: string) => {
        setShow(false);
        onSelect(value);
    };

    const handleTriggerClick = () => {
        setShow((prevState) => !prevState);
    };

    const finalClassNames = trimWhiteSpaces(
        `menu ${className ? className : ""}`
    );

    return (
        <div className={finalClassNames} ref={menuRef}>
            <Icon
                iconName="three-dots"
                onClick={handleTriggerClick}
                className="menu__default-trigger"
            />
            {show ? (
                <ul className="menu__options">
                    {options.map((option) => {
                        return (
                            <li
                                key={option.label}
                                className={trimWhiteSpaces(
                                    `menu__option ${
                                        option.color
                                            ? colorClassNames[option.color]
                                            : ""
                                    }`
                                )}
                                onClick={() => handleOnSelect(option.value)}
                            >
                                {option.iconName ? (
                                    <Icon iconName={option.iconName} />
                                ) : null}
                                {option.label}
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </div>
    );
};

export { Menu };
