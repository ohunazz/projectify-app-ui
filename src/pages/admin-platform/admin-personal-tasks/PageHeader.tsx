import styled from "styled-components";
import { Typography, Button } from "../../../design-system";

const PageHeaderBase = styled.header`
    display: flex;
    justify-content: space-between;
`;
const PageTitle = styled(Typography)`
    margin-bottom: var(--space-36);
`;

const PageHeader: React.FC<{ openCreateTaskModal: () => void }> = ({
    openCreateTaskModal
}) => {
    return (
        <PageHeaderBase>
            <PageTitle variant="h6" weight="medium">
                Personal Tasks
            </PageTitle>
            <Button
                variant="contained"
                color="primary"
                size="md"
                shape="rounded"
                onClick={openCreateTaskModal}
            >
                Create A Task
            </Button>
        </PageHeaderBase>
    );
};

export { PageHeader };
