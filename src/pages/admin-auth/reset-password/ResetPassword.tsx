import { useState } from "react";
import styled from "styled-components";
import { Button, Input } from "../../../design-system";
import { AuthWrapper } from "../../components";
import team from "../../../assets/images/team.png";

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-20);
`;

const ResetPassword = () => {
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    const handleOnChangePassword = (value: string) => {
        setPassword(value);
    };

    const handleOnChangePasswordConfirm = (value: string) => {
        setPasswordConfirm(value);
    };

    const resetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(password, passwordConfirm);
    };

    return (
        <AuthWrapper imageUrl={team} pageTitle="Reset Password">
            <Form onSubmit={resetPassword}>
                <Input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={handleOnChangePassword}
                    shape="rounded"
                    size="lg"
                />
                <Input
                    type="password"
                    placeholder="New Password Confirmation"
                    value={passwordConfirm}
                    onChange={handleOnChangePasswordConfirm}
                    shape="rounded"
                    size="lg"
                />

                <Button color="primary" size="lg" shape="rounded">
                    Reset Password
                </Button>
            </Form>
        </AuthWrapper>
    );
};

export { ResetPassword };
