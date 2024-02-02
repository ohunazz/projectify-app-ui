import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { Button, Input, Toaster } from "../../../design-system";
import { AuthWrapper } from "../../components";
import manhattanStreet from "../../../assets/images/manhattan-street.jpg";
import { admin } from "../../../api";

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-20);
`;

const ForgetPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);

    const handleOnChangeEmail = (value: string) => {
        setEmail(value);
    };

    const isFormSubmittable = email;

    const getInstructions = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsFormSubmitting(true);
            const response = await admin.forgotPassword(email);

            setIsFormSubmitting(false);
            setEmail("");
            toast.success(response.message);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <>
            <AuthWrapper
                imageUrl={manhattanStreet}
                pageTitle="Forget Password"
                switchLayout
            >
                <Form onSubmit={getInstructions} noValidate>
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
                        disabled={isFormSubmitting || !isFormSubmittable}
                    >
                        Get Instructions
                    </Button>
                </Form>
            </AuthWrapper>
            <Toaster />
        </>
    );
};

export { ForgetPassword as AdminForgetPassword };
