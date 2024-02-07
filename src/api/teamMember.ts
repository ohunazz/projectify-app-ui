import { TeamMemberUser } from "../types";

type CreatePasswordInput = {
    email: string;
    password: string;
    passwordConfirm: string;
};

type SignInInput = {
    email: string;
    password: string;
};

export type GetMeResponseType = {
    data: TeamMemberUser;
};

class TeamMember {
    url: string;
    constructor() {
        this.url = `${
            process.env.NODE_ENV === "development"
                ? process.env.REACT_APP_PROJECTIFY_API_URL_LOCAL
                : process.env.REACT_APP_PROJECTIFY_API_URL
        }/team-members`;
    }
    async createPassword(input: CreatePasswordInput, inviteToken: string) {
        try {
            const response = await fetch(
                `${this.url}/create-password?inviteToken=${inviteToken}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(input)
                }
            );
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

    async forgotPassword(email: string) {
        try {
            const response = await fetch(`${this.url}/forgot-password`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
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

    async resetPassword(
        password: string,
        passwordConfirm: string,
        token: string
    ) {
        try {
            const response = await fetch(`${this.url}/reset-password`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    password,
                    passwordConfirm
                })
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
}

export const teamMember = new TeamMember();
