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
import { Task } from "../../types";

const adminTasksReducer = produce(
    (draft: TaskState, action: ActionType): TaskState => {
        switch (action.type) {
            case Actions.POPULATE_TASKS: {
                const payload =
                    action.payload as PopulateTasksAction["payload"];
                return payload.reduce((acc: TaskState, task: Task) => {
                    acc[task.id] = task;
                    return acc;
                }, {});
            }
            case Actions.ADD_TASK: {
                const payload = action.payload as AddTaskAction["payload"];
                draft[payload.id] = payload;
                return draft;
            }
            case Actions.CHANGE_TASK_STATUS: {
                const payload =
                    action.payload as ChangeTaskStatusAction["payload"];
                const task = draft[payload.id];
                if (task) {
                    task.status = payload.status;
                }
                return draft;
            }

            case Actions.UPDATE_TASK: {
                const { id, data } =
                    action.payload as UpdateTaskAction["payload"];
                const task = draft[id];
                if (task) {
                    task.title = data.title || task.title;
                    task.status = data.status || task.status;
                    task.due = data.due || task.due;
                    task.description = data.description || task.description;
                }

                return draft;
            }

            case Actions.REMOVE_TASK: {
                const payload = action.payload as RemoveTaskAction["payload"];
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
