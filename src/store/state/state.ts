import { AdminUser, Task, TeamMember, TeamMemberUser } from "../../types";

export type UserState = AdminUser | TeamMemberUser | null;
export type TaskState = Task[];
export type TeamMemberState = TeamMember[];

export interface GlobalState {
    user: UserState;
    adminPersonalTasks: TaskState;

    teamMembers: TeamMemberState;
}

export const initialState: GlobalState = {
    user: null,
    adminPersonalTasks: [],

    teamMembers: []
};
