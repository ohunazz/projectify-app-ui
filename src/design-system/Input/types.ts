export type InputType = "text" | "email" | "password" | "tel" | "textarea";
export type InputShape = "rounded" | "circle";
export type InputSize = "sm" | "md" | "lg";

export type InputProps = {
    type?: "text" | "email" | "password" | "tel" | "textarea";
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    className?: string;
    id?: string;
    showPassword?: boolean;
    children?: React.ReactNode;

    error?: boolean;
    shape?: "rounded" | "circle";
    size?: "sm" | "md" | "lg";
    hintMessage?: string;
    labelText?: string;
    inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;

    onChange: (value: string) => void;
    value: string;
};
