import React from "react";
import { LinearProgressProps } from "./types";
import { getFinalClassName } from "./utils";
import { LinearProgressIndicator } from "./LinearProgressIndicator";

import "./LinearProgress.css";

const LinearProgress: React.FC<LinearProgressProps> = ({
    color,
    value,
    error,
    className,
    shape,
    size
}) => {
    const finalClassName = getFinalClassName(color, shape, size, className);

    return (
        <div className={finalClassName}>
            <div className="linear-progress__max">
                <div
                    className="linear-progress__progress"
                    style={{ width: `${value}%` }}
                ></div>
            </div>
            <div className="linear-progress__progress-indicator">
                <LinearProgressIndicator
                    error={error}
                    value={value}
                    shape={shape}
                />
            </div>
        </div>
    );
};

export { LinearProgress };
