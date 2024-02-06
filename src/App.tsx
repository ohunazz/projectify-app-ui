import { Link } from "react-router-dom";
import styled from "styled-components";
import { DatePickerV1 } from "./design-system";
import { useStore } from "./hooks";
import { useState } from "react";

const Base = styled.div`
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const App = () => {
    const [date, setDate] = useState<Date>();
    return (
        <Base>
            <h1>You are at Home</h1>
            <Link to="admin/sign-up">Admin Sign up</Link>
            <Link to="admin/sign-in">Admin Sign in</Link>
            <Link to="admin/forget-password">Admin Forgot Password</Link>
            <Link to="admin/reset-password">Admin Reset Password</Link>
            <Link to="admin/platform">Admin Platform</Link>

            <Link to="team-member/create-password">
                Team Member Create Password
            </Link>
            <Link to="team-member/sign-in">Team Member Login</Link>
            <Link to="team-member/forget-password">
                Team Member Forgot Password
            </Link>
            <Link to="team-member/reset-password">
                Team Member Reset Password
            </Link>
            <Link to="team-member/platform">Team Member Platform</Link>

            <div>
                <DatePickerV1
                    selected={date}
                    onChange={(date) => setDate(date)}
                    placeholder="Select Deadline"
                />
            </div>
        </Base>
    );
};

export { App };
