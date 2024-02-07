import styled, { css } from "styled-components";
import { KanbanCardProps } from "./types";
import { Badge, Bar, Menu, Typography } from "../../../design-system";
import { format } from "date-fns";
import { useState } from "react";

const KanbanCardBase = styled.div<{ $isDragging: boolean }>`
    background-color: var(--white);
    padding: var(--space-16);
    border-radius: var(--border-radius-16);
    box-shadow: var(--shadow-xs);

    display: flex;
    flex-direction: column;
    gap: var(--space-12);

    transition: opacity 0.5s;

    ${(props) =>
        props.$isDragging &&
        css`
            opacity: 0.5;
        `}

    &:not(:last-of-type) {
        margin-bottom: var(--space-10);
    }
`;

const KanbanCardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TaskTitle = styled(Typography)`
    margin-bottom: var(--space-4);
`;

const TaskDescription = styled(Typography)`
    color: var(--jaguar-500);
`;

const TaskDue = styled(Badge)`
    align-self: flex-end;
`;

enum StatusToColor {
    TODO = "gray",
    INPROGRESS = "orange",
    DONE = "green"
}

enum StatusToIcon {
    TODO = "flag",
    INPROGRESS = "flag",
    DONE = "check"
}
const KanbanCard: React.FC<KanbanCardProps> = ({
    task,
    menuActions,
    onSelectMenuAction
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(true);
        e.dataTransfer.setData("application/json", JSON.stringify(task));
    };

    const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(false);
    };

    const handleOnSelectMenuItem = (value: string) => {
        onSelectMenuAction(value, task.id);
    };

    return (
        <KanbanCardBase
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            $isDragging={isDragging}
        >
            <KanbanCardHeader>
                <Bar color={StatusToColor[task.status]} />
                <Menu items={menuActions} onSelect={handleOnSelectMenuItem} />
            </KanbanCardHeader>
            <div>
                <TaskTitle variant="paragraphLG" weight="semibold">
                    {task?.title}
                </TaskTitle>
                <TaskDescription variant="subtitleLG" weight="medium">
                    {task?.description}
                </TaskDescription>
            </div>
            <TaskDue
                label={format(task.due, "MMMM d")}
                color={StatusToColor[task.status]}
                iconName={StatusToIcon[task.status]}
                variant="contained"
                shape="rounded"
            />
        </KanbanCardBase>
    );
};

export { KanbanCard };
