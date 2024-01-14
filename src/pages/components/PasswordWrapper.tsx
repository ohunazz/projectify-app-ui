import { FC, ReactNode } from "react";
import { Typography } from "../../design-system";
import styled from "styled-components";

type PasswordWrapperProps = {
    pageTitle: string;
    imageUrl: string;
    children: ReactNode;
};

const PasswordWrapperBase = styled.main`
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const PasswordForm = styled.section`
    padding: var(--space-50);
`;

const PasswordContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 37rem;
`;

const PasswordImageWrapper = styled.div`
    padding: var(--space-50);
`;

const PasswordImage = styled.img.attrs({
    alt: "Projectify App | Update Password"
})`
    height: 24rem;
    width: auto;
`;

const PasswordWrapper: FC<PasswordWrapperProps> = ({
    imageUrl,
    pageTitle,
    children
}) => {
    return (
        <PasswordWrapperBase>
            <PasswordForm>
                <PasswordContent>
                    <Typography variant="h6">{pageTitle}</Typography>
                    <PasswordImageWrapper>
                        <PasswordImage src={imageUrl} />
                    </PasswordImageWrapper>
                    {children}
                </PasswordContent>
            </PasswordForm>
        </PasswordWrapperBase>
    );
};

export { PasswordWrapper };
