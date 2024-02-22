import {
    ProgressColor,
    LinearProgressShape,
    LinearProgressSize
} from "./types";
import { trimWhiteSpaces } from "../utils";

export const getFinalClassName = (
    color: ProgressColor | undefined,
    shape: LinearProgressShape | undefined,
    size: LinearProgressSize | undefined,
    className: string | undefined
) => {
    const colorClassNames = {
        orange: "linear-progress--orange",
        blue: "linear-progress--blue",
        green: "linear-progress--green",
        red: "linear-progress--red"
    };

    const sizeClassNames = {
        md: "linear-progress--md",
        lg: "linear-progress--lg"
    };

    const colorClassName = color ? colorClassNames[color] : "";
    const sizeClassName = size ? sizeClassNames[size] : "";
    const shapeClassName = shape ? "linear-progress--rounded" : "";

    const combinedClassNames = `linear-progress ${colorClassName} ${sizeClassName} ${shapeClassName} ${
        className || ""
    }`;

    return trimWhiteSpaces(combinedClassNames);
};
