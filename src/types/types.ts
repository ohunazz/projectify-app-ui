export enum UserRole {
    admin = "admin",
    teamMember = "teamMember"
}

interface User {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    role: UserRole;
    imageUrl?: string;
}

export interface AdminUser extends User {
    preferredFirstName: string;
    company: {
        name: string;
        position: string;
    } | null;
}

export interface TeamMemberUser extends User {
    position: string;
    status: string;
    adminId: string;
}

export type TaskStatus = "TODO" | "INPROGRESS" | "DONE";
export interface Task {
    id: string;
    title: string;
    description: string;
    due: string;
    status: TaskStatus;
}

export type TaskUpdate = {
    title?: string;
    description?: string;
    due?: string;
    status?: TaskStatus;
};

export enum AdminTeamMemberActions {
    edit = "edit",
    delete = "delete",
    reactivate = "reactivate",
    deactivate = "deactivate"
}

export type TeamMemberStatus = "ACTIVE" | "INACTIVE" | "DEACTIVATED";
export type AdminTeamMemberStatusChange = "reactivate" | "deactivate";

export type ProjectStatusChange =
    | "reactivate"
    | "onhold"
    | "complete"
    | "archive";

export interface TeamMember {
    id: string;
    status: TeamMemberStatus;
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    joinDate: string;
    password?: string;
}

export interface TeamMemberUpdate {
    firstName?: string;
    lastName?: string;
    position?: string;
    joinDate?: string;
}

export type ProjectStatus = "ACTIVE" | "ONHOLD" | "ARCHIVED" | "COMPLETED";
export type ContributorStatus = "ACTIVE" | "INACTIVE";

export interface ProjectContributor {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    joinedAt?: string;
    status?: ContributorStatus;
}

export interface ProjectContributors {
    assignedContributors: ProjectContributor[];
    notAssignedContributors: Omit<ProjectContributor, "joinedAt" | "status">[];
}
export interface Project {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    progress: number;
    startDate: string;
    endDate: string;
}

export interface ProjectWithContributors extends Project {
    numberOfContributors: number;
    contributors?: ProjectContributors;
}

export interface ProjectUpdate {
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
}
