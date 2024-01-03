import { useState } from "react";
import { Button, Input } from "../../../design-system";
import { AuthWrapper } from "../../components";

import teamWork from "../../../assets/images/team.png";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleOnChangeEmail = (value: string) => {
        setEmail(value);
    };

    const handleOnChangePassword = (value: string) => {
        setPassword(value);
    };

    const createAccount = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email, password);
    };

    return (
        <AuthWrapper imageUrl={teamWork} pageTitle="Login">
            <form className="login" onSubmit={createAccount} noValidate>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleOnChangeEmail}
                    shape="rounded"
                    size="lg"
                    className="login__email"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleOnChangePassword}
                    shape="rounded"
                    size="lg"
                    className="login__password"
                />

                <Button
                    color="primary"
                    size="lg"
                    shape="rounded"
                    className="login__submit-button"
                >
                    Login
                </Button>
            </form>
        </AuthWrapper>
    );
};

export { Login };
