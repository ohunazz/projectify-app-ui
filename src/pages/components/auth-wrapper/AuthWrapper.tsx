import { FC, ReactNode } from "react";
import { Logo } from "../../../design-system/Logo";
import "./AuthWrapper.css";

type AuthWrapperProps = {
    imageUrl: string;
    children: ReactNode;
    pageTitle: string;
};

const AuthWrapper: FC<AuthWrapperProps> = ({
    imageUrl,
    pageTitle,
    children
}) => {
    return (
        <main className="auth-wrapper">
            <section className="auth-wrapper__form">
                <div className="auth-wrapper__content">
                    <Logo layout="vertical" size="lg" customText={pageTitle} />
                    {children}
                </div>
            </section>
            <section className="auth-wrapper__image">
                <img src={imageUrl} alt="Projectify App | Hands making star" />
            </section>
        </main>
    );
};

export { AuthWrapper };
