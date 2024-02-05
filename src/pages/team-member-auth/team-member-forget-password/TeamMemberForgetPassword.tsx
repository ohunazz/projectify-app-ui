import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { Button, Input } from "../../../design-system";
import { AuthWrapper } from "../../components";
import manhattanStreet from "../../../assets/images/manhattan-street.jpg";

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-20);
`;

const ForgetPassword = () => {
    const [email, setEmail] = useState<string>("");

    const handleOnChangeEmail = (value: string) => {
        setEmail(value);
    };
    const getInstructions = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <AuthWrapper
            imageUrl={manhattanStreet}
            pageTitle="Forget Password"
            switchLayout
        >
            <Form onSubmit={getInstructions}>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleOnChangeEmail}
                    shape="rounded"
                    size="lg"
                />

                <Button color="primary" size="lg" shape="rounded">
                    Get Instructions
                </Button>
            </Form>
        </AuthWrapper>
    );
};

export { ForgetPassword as TeamMemberForgetPassword };
