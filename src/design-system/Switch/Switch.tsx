import React from "react";
import { trimWhiteSpaces } from "../utils";
import "./Switch.css";
import { Icon } from "../Icon";

const shapeClassNames = {
    rounded: "switch-rounded",
    circle: "switch-circle"
};

type SwitchShape = "rounded" | "circle";
interface ToggleProps {
    checked: boolean;
    className?: string;
    shape?: SwitchShape;
    onSwitch: (value: boolean) => void;
}

const Switch: React.FC<ToggleProps> = ({
    checked,
    onSwitch,
    shape,
    className
}) => {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSwitch(e.target.checked);
    };

    const shapeClassName = shape ? shapeClassNames[shape] : "";

    const trackClassNames = trimWhiteSpaces(
        `switch__track ${shapeClassName} ${checked ? "switch-on" : ""} 
        }${className ? className : ""}`
    );

    return (
        <label className={trackClassNames} htmlFor="switch">
            <input
                type="checkbox"
                className="switch__hidden-input"
                onChange={handleOnChange}
                id={"switch"}
            />
            <div className="switch__thumb">
                {checked && (
                    <Icon
                        iconName={!shape ? "check-sharp" : "check"}
                        className="switch__icon"
                    />
                )}
            </div>
        </label>
    );
};

export { Switch };
