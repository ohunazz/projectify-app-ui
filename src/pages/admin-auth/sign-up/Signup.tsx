import { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";

import { Button, Input, Toaster } from "../../../design-system";
import { AuthActionLink, AuthWrapper } from "../../components";
import { admin } from "../../../api";

import flatIronBuilding from "../../../assets/images/flat-iron-building.jpg";

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

const Signup = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [preferredName, setPreferredName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);

    const handleOnChangeFirstName = (value: string) => {
        setFirstName(value);
    };

    const handleOnChangeLastName = (value: string) => {
        setLastName(value);
    };

    const handleOnChangeName = (value: string) => {
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

    const isFormSubmittable =
        firstName && lastName && email && password && passwordConfirm;

    const createAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsFormSubmitting(true);
            const response = await admin.signUp({
                firstName,
                lastName,
                email,
                password,
                preferredName: preferredName,
            });
            setIsFormSubmitting(false);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPreferredName("");
            setPassword("");
            setPasswordConfirm("");

            toast.success(response.message);
        } catch (error) {
            if (error instanceof Error) {
                setIsFormSubmitting(false);

                toast.error(error.message);
            }
        }
    };

    return (
        <>
            <AuthWrapper imageUrl={flatIronBuilding} pageTitle="Sign Up">
                <Form onSubmit={createAccount}>
                    <Input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={handleOnChangeFirstName}
                        shape="rounded"
                        size="lg"
                        disabled={isFormSubmitting}
                    />
                    <Input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={handleOnChangeLastName}
                        shape="rounded"
                        size="lg"
                        disabled={isFormSubmitting}
                    />
                    <PreferredNameInput
                        type="text"
                        placeholder="Preferred First Name"
                        value={preferredName}
                        onChange={handleOnChangeName}
                        shape="rounded"
                        size="lg"
                        disabled={isFormSubmitting}
                    />
                    <EmailInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleOnChangeEmail}
                        shape="rounded"
                        size="lg"
                        disabled={isFormSubmitting}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleOnChangePassword}
                        shape="rounded"
                        size="lg"
                        disabled={isFormSubmitting}
                    />
                    <Input
                        type="password"
                        placeholder="Password Confirmation"
                        value={passwordConfirm}
                        onChange={handleOnChangePasswordConfirm}
                        shape="rounded"
                        size="lg"
                        disabled={isFormSubmitting}
                    />
                    <SubmitButton
                        color="primary"
                        size="lg"
                        shape="rounded"
                        disabled={isFormSubmitting || !isFormSubmittable}
                    >
                        Sign Up
                    </SubmitButton>
                </Form>
                <div style={{ marginTop: "auto" }}>
                    <AuthActionLink
                        linkText="Sign In"
                        hintText="Already have an account?"
                        linkTo="../admin/sign-in"
                    />
                </div>
            </AuthWrapper>
            <Toaster />
        </>
    );
};

export { Signup as AdminSignup };
