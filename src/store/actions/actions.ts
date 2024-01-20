import { UserType } from "../../types";

export enum Actions {
    INIT_USER = "INIT_USER",
    RESET_STATE = "RESET_STATE"
}

export interface InitUserAction {
    type: Actions;
    payload: UserType;
}

export interface ResetStateAction {
    type: Actions.RESET_STATE;
}

export type ActionType = InitUserAction | ResetStateAction;
