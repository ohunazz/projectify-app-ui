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

export interface Task {
    id: string;
    title: string;
    description: string;
    due: Date;
    status: TaskStatus;
}
export type TaskStatus = "TODO" | "INPROGRESS" | "DONE";

export type TeamMemberStatus = "ACTIVE" | "INACTIVE" | "DEACTIVATED";

export enum AdminTeamMemberActions {
    edit = "edit",
    delete = "delete",
    reactivate = "reactivate",
    deactivate = "deactivate"
}

export type AdminTeamMemberStatusChange = "reactivate" | "deactivate";

export interface TeamMember {
    id: string;
    status: TeamMemberStatus;
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    joinDate: Date;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
}

export type ProjectStatus = "ACTIVE" | "ARCHIVED";

export interface TeamMemberUpdate {
    firstName?: string;
    lastName?: string;
    position?: string;
    joinDate?: Date;
}
