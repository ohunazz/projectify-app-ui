import { LinearProgressShape, LinearProgressIndicatorProps } from "./types";

import { IconName, Icon } from "../Icon";
import { Typography } from "../Typography";

const iconNames: {
    [key: string]: {
        [key in LinearProgressShape]: IconName;
    };
} = {
    error: {
        rounded: "info-in-circle-filled",
        sharp: "info-in-circle-sharp-filled"
    },
    completed: {
        rounded: "check-in-circle-filled",
        sharp: "check-in-circle-sharp-filled"
    }
};

export const LinearProgressIndicator: React.FC<
    LinearProgressIndicatorProps
> = ({ error, value, shape }): JSX.Element => {
    const isCompleted = value === 100;

    let status = "";
    let finalShape: LinearProgressShape = "sharp";
    if (shape) {
        finalShape = shape;
    }
    if (error) {
        status = "error";
    }
    if (isCompleted) {
        status = "completed";
    }

    if (isCompleted || error) {
        return (
            <Icon
                iconName={iconNames[status][finalShape]}
                className="linear-progress__indicator-icon"
            />
        );
    }

    return (
        <Typography
            variant="paragraphSM"
            weight="medium"
            className="linear-progress__indicator-text"
        >
            {value}%
        </Typography>
    );
};
