import { FC, ReactNode } from "react";
import "./PasswordWrapper.css";
import { Typography } from "../../../design-system";

type PasswordWrapperProps = {
    pageTitle: string;
    imageUrl: string;
    children: ReactNode;
};

const PasswordWrapper: FC<PasswordWrapperProps> = ({
    imageUrl,
    pageTitle,
    children
}) => {
    return (
        <main className="password-wrapper">
            <section className="password-wrapper__form">
                <div className="password-wrapper__content">
                    <Typography variant="h6">{pageTitle}</Typography>
                    <div className="password-wrapper__image">
                        <img
                            src={imageUrl}
                            alt="Projectify App | Update Password"
                        />
                    </div>
                    {children}
                </div>
            </section>
        </main>
    );
};

export { PasswordWrapper };
