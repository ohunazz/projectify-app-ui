import { AdminUser, Task, TeamMemberUser } from "../../types";

export interface GlobalState {
    user: AdminUser | TeamMemberUser | null;
    adminPersonalTasks: Task[];
}

export const initialState: GlobalState = {
    user: null,
    adminPersonalTasks: []
};
