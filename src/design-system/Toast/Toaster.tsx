import React from "react";
import { Toaster as HotToaster, ToastPosition } from "react-hot-toast";

type ToasterProps = {
    position?: ToastPosition;
};

const Toaster: React.FC<ToasterProps> = () => {
    return (
        <HotToaster
            toastOptions={{
                duration: 8000,
                style: {
                    fontSize: "var(--font-size-14)",
                    fontFamily: "inherit",
                    padding: "var(--space-16)",
                    width: "40rem",
                },
                success: {
                    iconTheme: {
                        primary: "var(--green-500)",
                        secondary: "var(--white)",
                    },
                    style: {
                        backgroundColor: "var(--primary-25)",
                    },
                },
                error: {
                    iconTheme: {
                        primary: `var(--red-orange-500)`,
                        secondary: "var(--white)",
                    },
                    style: {
                        backgroundColor: "var(--red-orange-25)",
                    },
                },
            }}
        />
    );
};

export { Toaster };
