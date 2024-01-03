import { useState } from "react";
import { PasswordWrapper } from "../../components/password-wrapper/PasswordWrapper";
import { Input, Button } from "../../../design-system";
import forgotPassword from "../../../assets/images/forgot-password.svg";
import "./ForgotPassword.css";

const ForgotPassword = () => {
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
            <form
                className="forgot-password"
                onSubmit={getInstructions}
                noValidate
            >
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
            </form>
        </PasswordWrapper>
    );
};

export { ForgotPassword };
