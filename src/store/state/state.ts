import { AdminUser, Task, TeamMemberUser } from "../../types";

export type UserState = AdminUser | TeamMemberUser | null;

export type TaskState = Task[];

export interface GlobalState {
    user: UserState;
    adminPersonalTasks: TaskState;
    teamMemberPersonalTasks: TaskState;
}

export const initialState: GlobalState = {
    user: null,
    adminPersonalTasks: [],
    teamMemberPersonalTasks: []
};
