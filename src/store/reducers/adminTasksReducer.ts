import { produce } from "immer";

import {
    ActionType,
    Actions,
    AdminAddTaskAction,
    AdminChangeTaskStatusAction,
    AdminPopulateTasksAction,
    AdminRemoveTaskAction,
    AdminUpdateTaskAction
} from "../actions";
import { TaskState } from "../state";
import { Task } from "../../types";

const adminTasksReducer = produce(
    (draft: TaskState, action: ActionType): TaskState => {
        switch (action.type) {
            case Actions.ADMIN_POPULATE_TASKS: {
                const payload =
                    action.payload as AdminPopulateTasksAction["payload"];
                return payload.reduce((acc: TaskState, task: Task) => {
                    acc[task.id] = task;
                    return acc;
                }, {});
            }
            case Actions.ADMIN_ADD_TASK: {
                const payload = action.payload as AdminAddTaskAction["payload"];
                draft[payload.id] = payload;
                return draft;
            }
            case Actions.ADMIN_CHANGE_TASK_STATUS: {
                const payload =
                    action.payload as AdminChangeTaskStatusAction["payload"];
                const task = draft[payload.id];
                if (task) {
                    task.status = payload.status;
                }
                return draft;
            }

            case Actions.ADMIN_UPDATE_TASK: {
                const { id, data } =
                    action.payload as AdminUpdateTaskAction["payload"];
                const task = draft[id];
                if (task) {
                    task.title = data.title || task.title;
                    task.status = data.status || task.status;
                    task.due = data.due || task.due;
                    task.description = data.description || task.description;
                }

                return draft;
            }

            case Actions.ADMIN_REMOVE_TASK: {
                const payload =
                    action.payload as AdminRemoveTaskAction["payload"];
                delete draft[payload.id];
                return draft;
            }

            case Actions.RESET_STATE: {
                return {};
            }

            default:
                return draft;
        }
    }
);

export { adminTasksReducer };
