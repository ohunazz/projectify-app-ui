import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input } from "../../../design-system";
import toast from "react-hot-toast";
import { AuthActionLink, AuthWrapper } from "../../components";
import styled from "styled-components";
import { useLocalStorage } from "../../../hooks";

import brooklynBridge from "../../../assets/images/brooklyn-bridge.jpg";
import { adminService } from "../../../api";

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-20);
`;

const ActionLinks = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
`;

const Signin = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const navigate = useNavigate();
    const { setItem } = useLocalStorage();

    const handleOnChangeEmail = (value: string) => {
        setEmail(value);
    };

    const handleOnChangePassword = (value: string) => {
        setPassword(value);
    };

    const saveAuthToken = (token: string) => {
        setItem("authToken", token);
    };

    const isFormSubmittable = email && password;

    const signin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsFormSubmitting(true);
            const { token } = await adminService.signIn({
                email,
                password
            });
            console.log(token);

            saveAuthToken(token);
            navigate("/admin/platform");

            setIsFormSubmitting(false);
            setEmail("");
            setPassword("");
        } catch (error) {
            if (error instanceof Error) {
                setIsFormSubmitting(false);
                setIsError(true);
                toast.error(error.message);
            }
        }
    };

    return (
        <AuthWrapper imageUrl={brooklynBridge} pageTitle="Sign In">
            <Form onSubmit={signin}>
                <Input
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
                <Button
                    color="primary"
                    size="lg"
                    shape="rounded"
                    fullWidth={true}
                    disabled={isFormSubmitting || !isFormSubmittable}
                >
                    Sign In
                </Button>
            </Form>
            <ActionLinks>
                <AuthActionLink
                    hintText="Don’t have an account?"
                    linkTo="../admin/sign-up"
                    linkText="Sign Up"
                />
                <AuthActionLink
                    hintText="Forgot password? "
                    linkTo="../admin/forget-password"
                    linkText="Get Help"
                />
            </ActionLinks>
        </AuthWrapper>
    );
};

export { Signin as AdminSignin };
