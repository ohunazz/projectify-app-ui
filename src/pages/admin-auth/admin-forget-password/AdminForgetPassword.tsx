import { useState } from "react";
import styled from "styled-components";
import { PasswordWrapper } from "../../components/password-wrapper/PasswordWrapper";
import { Input, Button } from "../../../design-system";
import forgotPassword from "../../../assets/images/forgot-password.svg";

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-20);
`;

const AdminForgotPassword = () => {
    const [email, setEmail] = useState<string>("");

    const handleOnChangeEmail = (value: string) => {
        setEmail(value);
    };

    const getInstructions = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email);
    };

    return (
        <PasswordWrapper pageTitle="Forgot Password?" imageUrl={forgotPassword}>
            <Form onSubmit={getInstructions}>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleOnChangeEmail}
                    shape="rounded"
                    size="lg"
                />
                <Button
                    color="primary"
                    size="lg"
                    shape="rounded"
                    fullWidth={true}
                >
                    Get Instructions
                </Button>
            </Form>
        </PasswordWrapper>
    );
};

export { AdminForgotPassword };
