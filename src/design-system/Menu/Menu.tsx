import React, { useRef } from "react";
import { MenuProps } from "./types";
import "./Menu.css";
import { Icon } from "../Icon";
import { trimWhiteSpaces } from "../utils";
import { useCloseWhenClickOutside } from "../hooks";

const colorClassNames = {
    primary: "menu__item--primary",
    danger: "menu__item--danger"
};

const Menu: React.FC<MenuProps> = ({
    items,
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
            <Icon iconName="three-dots" onClick={handleTriggerClick} />
            {show ? (
                <ul className="menu__items">
                    {items.map((item) => {
                        return (
                            <li
                                key={item.label}
                                className={trimWhiteSpaces(
                                    `menu__item ${
                                        item.color
                                            ? colorClassNames[item.color]
                                            : ""
                                    }`
                                )}
                                onClick={() => handleOnSelect(item.value)}
                            >
                                {item.iconName ? (
                                    <Icon iconName={item.iconName} />
                                ) : null}
                                {item.label}
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </div>
    );
};

export { Menu };
