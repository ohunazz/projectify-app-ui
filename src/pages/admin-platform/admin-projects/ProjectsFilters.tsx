import styled from "styled-components";
import { Option, Select } from "../../../design-system";
import { PageFilters } from "../../components";

type ProjectsFiltersProps = {
    selectedStatus: string;
    setSelectedStatus: (option: Option) => void;
    sortedBy: string;
    setSortedBy: (option: Option) => void;
};

const statusOptions = [
    { label: "Active", value: "ACTIVE" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Archived", value: "ARCHIVED" },
    { label: "On Hold", value: "ONHOLD" }
];

const sortOptions = [
    { label: "Deadline", value: "deadline" },
    { label: "Progress", value: "progress" }
];
const Filters = styled(PageFilters)`
    .status-filter {
        margin-right: auto;
    }
`;

const ProjectsFilters: React.FC<ProjectsFiltersProps> = ({
    selectedStatus,
    setSelectedStatus,
    sortedBy,
    setSortedBy
}) => {
    return (
        <Filters>
            <Select
                value={selectedStatus}
                onSelect={setSelectedStatus}
                options={statusOptions}
                shape="rounded"
                size="md"
                headerPlaceholder="Filter By Status"
                className="status-filter"
            />
            <Select
                value={sortedBy}
                onSelect={setSortedBy}
                options={sortOptions}
                shape="rounded"
                size="md"
                headerPlaceholder="Sort By"
            />
        </Filters>
    );
};

export { ProjectsFilters };
