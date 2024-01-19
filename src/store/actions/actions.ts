import { UserType } from "../../types";

export enum Actions {
    INIT_USER = "INIT_USER",
    SOME_TEST = "SOME_TEST",
}

export interface InitUserAction {
    type: Actions;
    payload: UserType;
}

export interface UpdateProject {
    type: Actions.SOME_TEST;
}

export type ActionType = InitUserAction | UpdateProject;
