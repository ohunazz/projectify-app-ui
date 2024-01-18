import React from "react";
import styled from "styled-components";
import { Button, Typography } from "../../design-system";

type NoDatePlaceholderProps = {
    illustrationUrl: string;
    text: string;
    buttonText?: string;
    buttonAction?: () => void;
};

const NoDataPlaceholderBase = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Illustration = styled.img.attrs({ alt: "There is no data" })`
    display: block;
    margin: 0 auto var(--space-24) auto;
`;
const Text = styled(Typography)`
    margin-bottom: var(--space-50);
    text-align: center;
`;

const ActionButton = styled(Button)`
    margin: 0 auto;
`;

const NoDataPlaceholder: React.FC<NoDatePlaceholderProps> = ({
    illustrationUrl,
    text,
    buttonText,
    buttonAction,
}) => {
    return (
        <NoDataPlaceholderBase>
            <Illustration src={illustrationUrl} />
            <Text variant="paragraphLG" weight="medium">
                {text}
            </Text>
            {buttonText ? (
                <ActionButton
                    color="primary"
                    size="lg"
                    shape="rounded"
                    onClick={buttonAction}
                >
                    {buttonText}
                </ActionButton>
            ) : null}
        </NoDataPlaceholderBase>
    );
};

export { NoDataPlaceholder };
