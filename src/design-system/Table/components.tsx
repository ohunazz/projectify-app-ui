import styled, { css } from "styled-components";
import { BaseCellProps, BaseRowProps } from "./types";

export const TableRowBase = styled.tr<BaseRowProps>`
    display: grid;
    grid-template-columns: ${(props) => props.$columns.join(" ")};
    align-items: center;
    padding: 0 var(--space-16);
    border-radius: var(--border-radius-16);
`;

const Cell = css<BaseCellProps>`
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.$align ? props.$align : "left")};
`;

export const TableBodyCellBase = styled.td<BaseCellProps>`
    ${Cell}
`;

export const TableHeadCellBase = styled.th<BaseCellProps>`
    gap: var(--space-4);
    color: var(--jaguar-500);
    font-size: var(--font-size-16);
    line-height: var(--font-size-24);
    font-weight: var(--font-weight-600);

    ${Cell}
`;

export const TableBody = styled.tbody`
    ${TableRowBase} {
        height: 8.2rem;
        box-shadow: var(--shadow-s);
    }
    ${TableRowBase}:not(:last-child) {
        margin-bottom: var(--space-10);
    }
`;

export const TableHead = styled.thead`
    position: sticky;
    top: 0;
    z-index: 1;
    ${TableRowBase} {
        height: 6rem;
        border-radius: var(--border-radius-16);
        background-color: var(--jaguar-50);
        margin-bottom: var(--space-4);
    }
`;
