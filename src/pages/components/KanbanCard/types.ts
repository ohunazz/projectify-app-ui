import { MenuOption } from "../../../design-system";
import { Task } from "../../../types";

export type KanbanCardProps = {
    task: Task;
    menuActions: MenuOption[];
    onSelectMenuAction: (value: string, taskId: string) => void;
};
