import { UserType } from "../../types";

export interface GlobalState {
    user: UserType | null;
}

export const initialState: GlobalState = {
    user: null,
};
