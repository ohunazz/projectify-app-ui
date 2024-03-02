import {
    AdminUser,
    Project,
    ProjectWithContributors,
    ProjectStatus,
    ProjectUpdate,
    Task,
    TaskStatus,
    TaskUpdate,
    TeamMember,
    TeamMemberStatus,
    TeamMemberUpdate,
    TeamMemberUser
} from "../../types";

export enum Actions {
    INIT_USER = "INIT_USER",
    RESET_STATE = "RESET_STATE",
    ADMIN_POPULATE_TASKS = "ADMIN_POPULATE_TASKS",
    ADMIN_ADD_TASK = "ADMIN_ADD_TASK",
    ADMIN_CHANGE_TASK_STATUS = "ADMIN_CHANGE_TASK_STATUS",
    ADMIN_UPDATE_TASK = "ADMIN_UPDATE_TASK",
    ADMIN_REMOVE_TASK = "ADMIN_REMOVE_TASK",

    ADMIN_ADD_TEAM_MEMBER = "ADMIN_ADD_TEAM_MEMBER",
    ADMIN_POPULATE_TEAM_MEMBERS = "ADMIN_POPULATE_TEAM_MEMBERS",
    ADMIN_REMOVE_TEAM_MEMBER = "ADMIN_REMOVE_TEAM_MEMBER",
    ADMIN_CHANGE_TEAM_MEMBER_STATUS = "ADMIN_CHANGE_TEAM_MEMBER_STATUS",
    ADMIN_UPDATE_TEAM_MEMBER = "ADMIN_UPDATE_TEAM_MEMBER",
    ADMIN_CHANGE_PASSWORD_TEAM_MEMBER = "ADMIN_CHANGE_PASSWORD_TEAM_MEMBER",

    ADD_PROJECT = "ADMIN_ADD_PROJECT",
    POPULATE_PROJECTS = "POPULATE_PROJECTS",
    CHANGE_PROJECT_STATUS = "CHANGE_PROJECT_STATUS",
    UPDATE_PROJECT = "UPDATE_PROJECT"
}

export interface InitUserAction {
    type: Actions;
    payload: AdminUser | TeamMemberUser;
}

export interface ResetStateAction {
    type: Actions.RESET_STATE;
}

export interface AdminPopulateTasksAction {
    type: Actions.ADMIN_POPULATE_TASKS;
    payload: Task[];
}

export interface AdminAddTaskAction {
    type: Actions.ADMIN_ADD_TASK;
    payload: Task;
}

export type AdminChangeTaskStatusAction = {
    type: Actions.ADMIN_CHANGE_TASK_STATUS;
    payload: {
        id: string;
        status: TaskStatus;
    };
};

export type AdminUpdateTaskAction = {
    type: Actions.ADMIN_UPDATE_TASK;
    payload: {
        id: string;
        data: TaskUpdate;
    };
};

export type AdminRemoveTaskAction = {
    type: Actions.ADMIN_REMOVE_TASK;
    payload: {
        id: string;
    };
};

export type AdminAddTeamMemberAction = {
    type: Actions.ADMIN_ADD_TEAM_MEMBER;
    payload: TeamMember;
};

export type AdminPopulateTeamMembersAction = {
    type: Actions.ADMIN_POPULATE_TEAM_MEMBERS;
    payload: TeamMember[];
};

export type AdminRemoveTeamMemberAction = {
    type: Actions.ADMIN_REMOVE_TEAM_MEMBER;
    payload: {
        id: string;
    };
};

export type AdminChangeTeamMemberStatusAction = {
    type: Actions.ADMIN_CHANGE_TEAM_MEMBER_STATUS;
    payload: {
        id: string;
        status: TeamMemberStatus;
    };
};

export type AdminUpdateTeamMemberAction = {
    type: Actions.ADMIN_UPDATE_TEAM_MEMBER;
    payload: {
        id: string;
        data: TeamMemberUpdate;
    };
};

export type AddProjectAction = {
    type: Actions.ADD_PROJECT;
    payload: Project;
};

export type PopulateProjectsAction = {
    type: Actions.POPULATE_PROJECTS;
    payload: ProjectWithContributors[];
};

export type ChangeProjectStatusAction = {
    type: Actions.CHANGE_PROJECT_STATUS;
    payload: { id: string; status: ProjectStatus };
};

export type UpdateProjectAction = {
    type: Actions.UPDATE_PROJECT;
    payload: {
        id: string;
        data: ProjectUpdate;
    };
};

export type ActionType =
    | InitUserAction
    | ResetStateAction
    | AdminPopulateTasksAction
    | AdminAddTaskAction
    | AdminChangeTaskStatusAction
    | AdminUpdateTaskAction
    | AdminRemoveTaskAction
    | AdminAddTeamMemberAction
    | AdminPopulateTeamMembersAction
    | AdminRemoveTeamMemberAction
    | AdminChangeTeamMemberStatusAction
    | AdminUpdateTeamMemberAction
    | AddProjectAction
    | PopulateProjectsAction
    | ChangeProjectStatusAction
    | UpdateProjectAction;
