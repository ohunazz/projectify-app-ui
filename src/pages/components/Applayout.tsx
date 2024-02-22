import styled from "styled-components";

const AppLayout = styled.main`
    display: flex;
`;

const AppPage = styled.section`
    height: 100vh;
    width: 100%;
    background-color: var(--jaguar-12);
    padding: var(--space-30);
`;
export const Scrollable = styled.div`
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 0.4rem;
        border-radius: var(--border-radius-8);
    }
    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: var(--border-radius-8);
    }
`;

export { AppLayout, AppPage };
