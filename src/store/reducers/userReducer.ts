import {
    ActionType,
    Actions,
    AddTaskAction,
    ChangeTaskStatusAction,
    PopulateTasksAction,
    RemoveTaskAction,
    UpdateTaskAction
} from "../actions";
import { GlobalState, initialState } from "../state";

export const userReducer = (
    state: GlobalState,
    action: ActionType
): GlobalState => {
    if (action.type === Actions.INIT_USER) {
        return {
            ...state,
            user: action.payload
        };
    } else if (action.type === Actions.RESET_STATE) {
        return initialState;
    } else if (action.type === Actions.POPULATE_TASKS) {
        const payload = action.payload as PopulateTasksAction["payload"];

        return {
            ...state,
            adminPersonalTasks: payload
        };
    } else if (action.type === Actions.ADD_TASK) {
        const payload = action.payload as AddTaskAction["payload"];

        if (state.adminPersonalTasks) {
            return {
                ...state,
                adminPersonalTasks: [
                    ...state.adminPersonalTasks,
                    action.payload as AddTaskAction["payload"]
                ]
            };
        } else {
            return {
                ...state,
                adminPersonalTasks: [payload]
            };
        }
    } else if (action.type === Actions.CHANGE_TASK_STATUS) {
        const payload = action.payload as ChangeTaskStatusAction["payload"];
        const updatedTasks = state.adminPersonalTasks.map((task) => {
            if (task.id === payload.id) {
                return { ...task, status: payload.status };
            } else {
                return { ...task };
            }
        });

        return {
            ...state,
            adminPersonalTasks: updatedTasks
        };
    } else if (action.type === Actions.UPDATE_TASK) {
        const payload = action.payload as UpdateTaskAction["payload"];
        const updatedTasks = state.adminPersonalTasks.map((task) => {
            if (task.id === payload.id) {
                return payload;
            } else {
                return { ...task };
            }
        });

        return {
            ...state,
            adminPersonalTasks: updatedTasks
        };
    } else if (action.type === Actions.REMOVE_TASK) {
        const payload = action.payload as RemoveTaskAction["payload"];

        return {
            ...state,
            adminPersonalTasks: state.adminPersonalTasks.filter(
                (task) => task.id !== payload.id
            )
        };
    }

    return state;
};
