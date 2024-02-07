import React from "react";
import { IconName } from "../Icon";

type BadgeColors =
    | "violet"
    | "orange"
    | "green"
    | "blue"
    | "red"
    | "purple"
    | "gray";

type BadgeShape = "rounded" | "circle";

type BadgeVariant = "contained" | "outlined";

interface BadgePropsBase {
    label: string;
    color: BadgeColors;
    shape?: BadgeShape;
    variant?: BadgeVariant;
    status?: boolean;
    className?: string;
    icon?: React.ReactNode;

    iconName?: IconName;
}

type ExclusiveBadgeProps =
    | { status?: BadgePropsBase["status"]; icon?: never; iconName?: never }
    | { icon?: BadgePropsBase["icon"]; status?: never; iconName?: never }
    | { iconName?: BadgePropsBase["iconName"]; status?: never; icon?: never };

export type BadgeProps = BadgePropsBase & ExclusiveBadgeProps;
