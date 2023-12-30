type SignUpInput = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    company: {
        name: string,
        position: string
    }
};

type singnInInput = {
    email: string,
    password: string
};

class Admin {
    url: string;
    constructor() {
        this.url = `${process.env.REACT_APP_PROJECTIFY_API_URL}/admins`;
    }
    async signUp(input: SignUpInput) {
        try {
            const response = await fetch(`${this.url}/sign-up`, {
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
        } catch (error) {
            throw error;
        }
    }
    async signIn(input: singnInInput) {
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
        } catch (error) {
            throw error;
        }
    }
}

export const admin = new Admin();
