import React from "react";
import "./StatusBadge.css";
import { Typography } from "../Typography";

type BadgeProps = {
    status: "ACTIVE" | "INACTIVE" | "COMPLETED" | "ARCHIVED";
};

const StatusBadge: React.FC<BadgeProps> = ({ status }) => {
    return (
        <span className={`status-badge-wrapper ${status}-badge-wrapper`}>
            <div className={`sign ${status}-sign`}></div>
            <Typography
                variant="subtitleSM"
                weight="semibold"
                className={`${status}`}
            >
                {status}
            </Typography>
        </span>
    );
};

export { StatusBadge };
