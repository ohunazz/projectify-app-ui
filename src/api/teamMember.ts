import {
    AdminTeamMemberStatusChange,
    TeamMember,
    TeamMemberUpdate,
    TeamMemberUser
} from "../types";

export type GetMeResponseType = {
    data: TeamMemberUser;
};

interface CreatePasswordInput {
    password: string;
    passwordConfirm: string;
    email: string;
}

type SignInInput = {
    email: string;
    password: string;
};

type CreateInput = Omit<TeamMember, "id" | "status">;

type CreateInputResponse = {
    data: TeamMember;
};

type GetAllTeamMembersResponse = {
    data: TeamMember[];
};

class TeamMemberService {
    url: string;
    constructor() {
        this.url = `${
            process.env.NODE_ENV === "development"
                ? process.env.REACT_APP_PROJECTIFY_API_URL_LOCAL
                : process.env.REACT_APP_PROJECTIFY_API_URL
        }/team-members`;
    }

    async create(input: CreateInput): Promise<CreateInputResponse> {
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

    async getAll(): Promise<GetAllTeamMembersResponse> {
        try {
            const rawAuthToken = localStorage.getItem("authToken");
            const authToken = rawAuthToken ? JSON.parse(rawAuthToken) : "";
            const response = await fetch(`${this.url}/`, {
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

    async signIn(input: SignInInput): Promise<{ token: string }> {
        try {
            const response = await fetch(`${this.url}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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

    async getMe(): Promise<GetMeResponseType> {
        try {
            const rawAuthToken = localStorage.getItem("authToken");
            const authToken = rawAuthToken ? JSON.parse(rawAuthToken) : "";
            const response = await fetch(`${this.url}/me`, {
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

    async createPassword(input: CreatePasswordInput, inviteToken: string) {
        try {
            const response = await fetch(`${this.url}/create-password`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${inviteToken}`
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

    async delete(teamMemberId: string) {
        const rawAuthToken = localStorage.getItem("authToken");
        const authToken = rawAuthToken ? JSON.parse(rawAuthToken) : "";
        try {
            const response = await fetch(`${this.url}/${teamMemberId}/delete`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    }

    async changeStatus(
        teamMemberId: string,
        changeStatus: AdminTeamMemberStatusChange
    ) {
        const rawAuthToken = localStorage.getItem("authToken");
        const authToken = rawAuthToken ? JSON.parse(rawAuthToken) : "";
        try {
            const response = await fetch(
                `${this.url}/${teamMemberId}/${changeStatus}`,
                {
                    method: "PATCH",
                    headers: {
                        authorization: `Bearer ${authToken}`
                    }
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    }

    async update(teamMemberId: string, updateData: TeamMemberUpdate) {
        const rawAuthToken = localStorage.getItem("authToken");
        const authToken = rawAuthToken ? JSON.parse(rawAuthToken) : "";

        try {
            const response = await fetch(`${this.url}/${teamMemberId}/update`, {
                method: "PATCH",
                headers: {
                    authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    }
}

export const teamMemberService = new TeamMemberService();
