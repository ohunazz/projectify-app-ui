import { Project } from "../types";

type CreateProjectInput = Omit<Project, "id" | "status">;

interface GetAllProjectsResponse {
    data: {
        projects: Project[];
    };
}

class AdminProjects {
    url: string;
    constructor() {
        this.url = `${
            process.env.NODE_ENV === "development"
                ? process.env.REACT_APP_PROJECTIFY_API_URL_LOCAL
                : process.env.REACT_APP_PROJECTIFY_API_URL
        }/projects`;
    }

    async create(input: CreateProjectInput) {
        try {
            const rawAuthToken = localStorage.getItem("authToken");
            const authToken = rawAuthToken ? JSON.parse(rawAuthToken) : "";
            const response = await fetch(`${this.url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${authToken}`
                },
                body: JSON.stringify(input)
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            return response.json();
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<{ data: GetAllProjectsResponse }> {
        try {
            const rawAuthToken = localStorage.getItem("authToken");
            const authToken = rawAuthToken ? JSON.parse(rawAuthToken) : "";
            const response = await fetch(`${this.url}`, {
                headers: {
                    authorization: `Bearer ${authToken}`
                }
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            return response.json();
        } catch (error) {
            throw error;
        }
    }
}

export const adminProjects = new AdminProjects();
