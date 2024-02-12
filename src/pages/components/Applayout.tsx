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

const Page = styled.main`
    position: relative;
    width: 100%;
    height: 100%;
`;

const PageContent = styled.section`
    width: 90%;
    margin: 0 auto;
`;

export { AppLayout, AppContent, Page, PageContent };
