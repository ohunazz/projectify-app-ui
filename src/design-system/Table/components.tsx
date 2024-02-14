import styled, { css } from "styled-components";
import { BaseCellProps, BaseRowProps } from "./types";

export const TableRowBase = styled.tr<BaseRowProps>`
    display: grid;
    grid-template-columns: ${(props) => props.$columns};
    padding: var(--space-16);
    border-radius: var(--border-radius-24);
    box-shadow: var(--shadow-xs);
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
    }
    ${TableRowBase}:not(:last-child) {
        margin-bottom: var(--space-10);
    }
`;

export const TableHead = styled.thead`
    ${TableRowBase} {
        height: 4rem;
        margin-bottom: var(--space-4);
    }
`;
export const TableBase = styled.table;
