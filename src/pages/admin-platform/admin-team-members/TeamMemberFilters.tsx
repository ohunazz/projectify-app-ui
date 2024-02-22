import styled from "styled-components";
import { Input, Option, Select } from "../../../design-system";

type TeamMemberFiltersProps = {
    selectedStatus: string;
    setSelectedStatus: (option: Option) => void;
    searchText: string;
    setSearchText: (value: string) => void;
};

const FiltersBase = styled.section`
    display: grid;
    grid-template-columns: 20rem 1fr 20rem;
    align-items: center;
    gap: var(--space-24);
    margin-bottom: var(--space-20);

    .filter-by-status {
        grid-column: 1 / 2;
    }

    .search {
        grid-column: 2 / 3;
    }
    .filter-by-project {
        grid-column: 4 / 5;
    }
`;
const statusOptions = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
    { label: "Deactivated", value: "DEACTIVATED" },
    { label: "All", value: "all" }
];
const TeamMemberFilters: React.FC<TeamMemberFiltersProps> = ({
    selectedStatus,
    setSelectedStatus,
    searchText,
    setSearchText
}) => {
    return (
        <FiltersBase>
            <Select
                value={selectedStatus}
                onSelect={setSelectedStatus}
                options={statusOptions}
                shape="rounded"
                size="md"
                headerPlaceholder="By Status"
                className="filter-by-status"
            />
            <Input
                value={searchText}
                onChange={setSearchText}
                placeholder="Search..."
                shape="rounded"
                size="md"
                className="search"
            />
            <Select
                value=""
                onSelect={() => {}}
                options={[]}
                shape="rounded"
                size="md"
                headerPlaceholder="By Project"
                className="filter-by-project"
            />
        </FiltersBase>
    );
};

export { TeamMemberFilters };
