import styled from "styled-components";

const AppLayout = styled.main`
    display: grid;
    grid-template-columns: 30.4rem 1fr;
`;

const AppContent = styled.section`
    background-color: var(--primary-12);
    height: 100vh;
    padding: var(--space-30);
`;

export { AppLayout, AppContent };
