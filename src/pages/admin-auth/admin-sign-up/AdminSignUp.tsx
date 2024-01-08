import { useState } from "react";
import styled from "styled-components";
import { Button, Input } from "../../../design-system";
import { AuthWrapper } from "../../components";

import teamWork from "../../../assets/images/team.png";

const Form = styled.form`
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-20);

    svg {
        color: red;
    }
`;

const PreferredNameInput = styled(Input)`
    grid-column: 1 / 3;
`;

const EmailInput = styled(Input)`
    grid-column: 1 / 3;
`;

const SubmitButton = styled(Button)`
    grid-column: 1 / 3;
`;

const AdminSignup = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [preferredName, setPreferredName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    const handleOnChangeFirstName = (value: string) => {
        setFirstName(value);
    };

    const handleOnChangeLastName = (value: string) => {
        setLastName(value);
    };

    const handleOnChangePreferredName = (value: string) => {
        setPreferredName(value);
    };

    const handleOnChangeEmail = (value: string) => {
        setEmail(value);
    };

    const handleOnChangePassword = (value: string) => {
        setPassword(value);
    };

    const handleOnChangePasswordConfirm = (value: string) => {
        setPasswordConfirm(value);
    };

    const createAccount = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(
            firstName,
            lastName,
            preferredName,
            email,
            password,
            passwordConfirm
        );
    };

    return (
        <AuthWrapper imageUrl={teamWork} pageTitle="Sign Up">
            <Form onSubmit={createAccount}>
                <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleOnChangeFirstName}
                    shape="rounded"
                    size="lg"
                />
                <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleOnChangeLastName}
                    shape="rounded"
                    size="lg"
                />

                <PreferredNameInput
                    type="text"
                    placeholder="Preferred First Name"
                    value={preferredName}
                    onChange={handleOnChangePreferredName}
                    shape="rounded"
                    size="lg"
                />
                <EmailInput
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleOnChangeEmail}
                    shape="rounded"
                    size="lg"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleOnChangePassword}
                    shape="rounded"
                    size="lg"
                />
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirm}
                    onChange={handleOnChangePasswordConfirm}
                    shape="rounded"
                    size="lg"
                />
                <Button color="primary" size="lg" shape="rounded">
                    Sign Up
                </Button>
            </Form>
        </AuthWrapper>
    );
};

export { AdminSignup };
