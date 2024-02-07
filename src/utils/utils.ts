import { Task } from "../types";

export interface GroupedTasks {
    [status: string]: Task[];
}

export const groupTasksByStatus = (data: Task[]): GroupedTasks => {
    const grouped: GroupedTasks = {
        TODO: [],
        INPROGRESS: [],
        DONE: []
    };

    data.forEach((task) => {
        const { status } = task;
        grouped[status].push(task);
    });

    return grouped;
};
