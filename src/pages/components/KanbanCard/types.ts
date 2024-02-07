import { MenuItem } from "../../../design-system";
import { Task } from "../../../types";

export type KanbanCardProps = {
    task: Task;
    menuActions: MenuItem[];
    onSelectMenuAction: (value: string, taskId: string) => void;
};
