import { useState } from "react";
import { Button, Input } from "../../../design-system";
import { AuthWrapper } from "../../components";

import teamWork from "../../../assets/images/team.jpg";
import "./SignUp.css";

const Signup = () => {
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
            <form className="sign-up" onSubmit={createAccount} noValidate>
                <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleOnChangeFirstName}
                    shape="rounded"
                    size="lg"
                    className="sign-up__first-name"
                />
                <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleOnChangeLastName}
                    shape="rounded"
                    size="lg"
                />

                <Input
                    type="text"
                    placeholder="Preferred First Name"
                    value={preferredName}
                    onChange={handleOnChangePreferredName}
                    shape="rounded"
                    size="lg"
                    className="sign-up__preferred-name"
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleOnChangeEmail}
                    shape="rounded"
                    size="lg"
                    className="sign-up__email"
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
                <Button
                    color="primary"
                    size="lg"
                    shape="rounded"
                    className="sign-up__submit-button"
                >
                    Sign Up
                </Button>
            </form>
        </AuthWrapper>
    );
};

export { Signup };
