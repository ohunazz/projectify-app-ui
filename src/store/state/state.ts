import {
    AdminUser,
    ProjectWithContributors,
    Task,
    TeamMember,
    TeamMemberUser
} from "../../types";

export type UserState = AdminUser | TeamMemberUser | null;
export type TeamMemberState = { [teamMemberId: string]: TeamMember };
export type TaskState = { [taskId: string]: Task };
export type ProjectState = { [projectId: string]: ProjectWithContributors };

export interface GlobalState {
    user: UserState;
    adminPersonalTasks: TaskState;
    teamMembers: TeamMemberState;
    teamMemberPersonalTasks: TaskState;
    projects: ProjectState;
}

export const initialState: GlobalState = {
    user: null,
    adminPersonalTasks: {},
    teamMembers: {},
    teamMemberPersonalTasks: {},
    projects: {}
};
