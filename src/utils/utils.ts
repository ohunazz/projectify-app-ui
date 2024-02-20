import { formatISO, parseISO } from "date-fns";
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

export const toIso8601 = (date: Date) => {
    return formatISO(date);
};

export const toDateObj = (iso8601: string) => {
    return parseISO(iso8601);
};
