import styled from "styled-components";

const PageFilters = styled.section`
    display: flex;
    align-items: center;
    gap: var(--space-16);
    margin-bottom: var(--space-20);
    > * {
        flex-basis: 20rem;
    }
`;

export { PageFilters };
