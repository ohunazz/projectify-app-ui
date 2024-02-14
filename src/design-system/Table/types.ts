export type HorizontalAlign = "right" | "left" | "center";

export interface BaseCellProps {
    $align?: HorizontalAlign;
}

export interface BaseRowProps {
    $columns: string[];
}

export interface TableRowProps {
    columns: string[];
    children: React.ReactNode;
}

export interface TableBodyCellProps {
    align: HorizontalAlign;
    children: React.ReactNode;
}

export interface TableHeadCellProps {
    align: HorizontalAlign;
    children: React.ReactNode;
}
