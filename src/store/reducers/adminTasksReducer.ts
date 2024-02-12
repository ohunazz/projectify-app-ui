import { produce } from "immer";

import {
    ActionType,
    Actions,
    AddTaskAction,
    ChangeTaskStatusAction,
    PopulateTasksAction,
    RemoveTaskAction,
    UpdateTaskAction
} from "../actions";
import { TaskState } from "../state";

const adminTasksReducer = produce(
    (draft: TaskState, action: ActionType): TaskState => {
        switch (action.type) {
            case Actions.POPULATE_TASKS: {
                const payload =
                    action.payload as PopulateTasksAction["payload"];
                return payload;
            }
            case Actions.ADD_TASK: {
                const payload = action.payload as AddTaskAction["payload"];
                draft.push(payload);
                return draft;
            }
            case Actions.CHANGE_TASK_STATUS: {
                const payload =
                    action.payload as ChangeTaskStatusAction["payload"];

                for (let i = 0; i < draft.length; i++) {
                    const task = draft[i];
                    if (task.id === payload.id) {
                        task.status = payload.status;
                        break;
                    }
                }
                return draft;
            }

            case Actions.UPDATE_TASK: {
                const payload = action.payload as UpdateTaskAction["payload"];
                for (let i = 0; i < draft.length; i++) {
                    const task = draft[i];
                    if (task.id === payload.id) {
                        draft[i] = payload;
                        break;
                    }
                }

                return draft;
            }

            case Actions.REMOVE_TASK: {
                const payload = action.payload as RemoveTaskAction["payload"];

                return draft.filter((task) => task.id !== payload.id);
            }

            case Actions.RESET_STATE: {
                return [];
            }
            default:
                return draft;
        }
    }
);

export { adminTasksReducer };
