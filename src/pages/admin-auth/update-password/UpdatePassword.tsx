import { useState } from "react";
import { PasswordWrapper } from "../../components/password-wrapper/PasswordWrapper";
import { Input, Button } from "../../../design-system";
import updatePassword from "../../../assets/images/update-password.svg";
import "./UpdatePassword.css";

const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    const handleOnChangeNewPassword = (value: string) => {
        setNewPassword(value);
    };

    const handleOnChangePasswordConfirm = (value: string) => {
        setPasswordConfirm(value);
    };

    const resetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(newPassword, passwordConfirm);
    };

    return (
        <PasswordWrapper pageTitle="Update Password?" imageUrl={updatePassword}>
            <form
                className="update-password"
                onSubmit={resetPassword}
                noValidate
            >
                <Input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={handleOnChangeNewPassword}
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
                    fullWidth={true}
                >
                    Reset Password
                </Button>
            </form>
        </PasswordWrapper>
    );
};

export { UpdatePassword };
