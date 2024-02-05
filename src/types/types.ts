export enum UserRole {
    admin = "admin",
    teamMember = "teamMember"
}

export interface UserType {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    imageUrl?: string;
    company: {
        name: string;
        position: string;
    } | null;
    role: UserRole;
}

export interface AdminUser extends UserType {
    preferredFirstName: string;
    company: {
        name: string;
        position: string;
    } | null;
}

export interface TeamMemberUser extends UserType {
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

export type ProjectStatus = "ACTIVE" | "ARCHIVED";

export interface Project {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
}
