import { userReducer } from "./userReducer";
import { adminTasksReducer } from "./adminTasksReducer";
import { GlobalState } from "../state";
import { ActionType } from "../actions";

import { adminTeamMembersReducer } from "./adminTeamMembersReducer";

const rootReducer = (state: GlobalState, action: ActionType): GlobalState => {
    const newState: GlobalState = {
        user: userReducer(state.user, action),
        adminPersonalTasks: adminTasksReducer(state.adminPersonalTasks, action),
        teamMembers: adminTeamMembersReducer(state.teamMembers, action)
    };

    return newState;
};

export { rootReducer };
