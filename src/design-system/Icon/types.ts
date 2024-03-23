export type IconName =
    | "tasks"
    | "support"
    | "stories"
    | "settings"
    | "projects"
    | "members"
    | "log-out"
    | "chevron-right"
    | "flag"
    | "check"
    | "three-dots"
    | "edit"
    | "delete"
    | "chevron-down"
    | "calendar"
    | "check-sharp"
    | "minus-sharp"
    | "minus"
    | "archive"
    | "x"
    | "arrow-left"
    | "info-in-circle-filled"
    | "check-in-circle-filled"
    | "info-in-circle-sharp-filled"
    | "check-in-circle-sharp-filled"
    | "check-in-circle"
    | "x-in-circle"
    | "pause-in-circle"
    | "play-in-circle";

export type IconProps = {
    iconName: IconName;
    className?: string;
    height?: string;
    width?: string;
    onClick?: () => void;
};
