import styled from "styled-components";
import { Select } from "../../../design-system";

const FiltersBase = styled.section`
    display: grid;
    grid-template-columns: 20rem 1fr 20rem;
    align-items: center;
    margin-bottom: var(--space-20);

    .filter-by-project {
        grid-column: 1 / 2;
    }

    .filter-by-status {
        grid-column: 3 / 4;
    }
`;
const statusOptions = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
    { label: "Deactivated", value: "DEACTIVATED" }
];
const TeamMemberFilters = () => {
    return (
        <FiltersBase>
            <Select
                value=""
                onSelect={() => {}}
                options={[]}
                shape="rounded"
                size="md"
                headerPlaceholder="By Project"
                className="filter-by-project"
            />
            <Select
                value=""
                onSelect={() => {}}
                options={statusOptions}
                shape="rounded"
                size="md"
                headerPlaceholder="By Status"
                className="filter-by-status"
            />
        </FiltersBase>
    );
};

export { TeamMemberFilters };
