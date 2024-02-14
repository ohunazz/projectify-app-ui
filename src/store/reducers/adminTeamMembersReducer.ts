import { produce } from "immer";
import { TeamMemberState } from "../state";
import {
    ActionType,
    Actions,
    AdminPopulateTeamMembersAction,
    AdminAddTeamMemberAction
} from "../actions";

const adminTeamMembersReducer = produce(
    (draft: TeamMemberState, action: ActionType) => {
        switch (action.type) {
            case Actions.ADMIN_ADD_TEAM_MEMBER: {
                const payload =
                    action.payload as AdminAddTeamMemberAction["payload"];
                draft.push(payload);
                return draft;
            }
            case Actions.ADMIN_POPULATE_TEAM_MEMBERS: {
                const payload =
                    action.payload as AdminPopulateTeamMembersAction["payload"];
                return payload;
            }
            default:
                return draft;
        }
    }
);

export { adminTeamMembersReducer };
