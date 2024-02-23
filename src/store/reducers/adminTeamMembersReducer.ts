import { produce } from "immer";
import { TeamMemberState } from "../state";
import {
    ActionType,
    Actions,
    AdminPopulateTeamMembersAction,
    AdminAddTeamMemberAction,
    AdminRemoveTeamMemberAction,
    AdminUpdateTeamMemberAction,
    AdminChanePasswordTeamMemberAction,
    AdminChangeTeamMemberStatusAction
} from "../actions";

const adminTeamMembersReducer = produce(
    (draft: TeamMemberState, action: ActionType) => {
        switch (action.type) {
            case Actions.ADMIN_ADD_TEAM_MEMBER: {
                const payload =
                    action.payload as AdminAddTeamMemberAction["payload"];
                draft[payload.id] = payload;
                return draft;
            }
            case Actions.ADMIN_POPULATE_TEAM_MEMBERS: {
                const payload =
                    action.payload as AdminPopulateTeamMembersAction["payload"];
                return payload.reduce((acc: TeamMemberState, teamMember) => {
                    acc[teamMember.id] = teamMember;
                    return acc;
                }, {});
            }
            case Actions.ADMIN_REMOVE_TEAM_MEMBER: {
                const payload =
                    action.payload as AdminRemoveTeamMemberAction["payload"];

                delete draft[payload.id];
                return draft;
            }
            case Actions.ADMIN_CHANGE_TEAM_MEMBER_STATUS: {
                const payload =
                    action.payload as AdminChangeTeamMemberStatusAction["payload"];
                const teamMember = draft[payload.id];

                if (teamMember) {
                    teamMember.status = payload.status;
                }

                return draft;
            }

            case Actions.ADMIN_UPDATE_TEAM_MEMBER: {
                const payload =
                    action.payload as AdminUpdateTeamMemberAction["payload"];
                const { id, data } = payload;
                const teamMember = draft[id];

                if (teamMember) {
                    teamMember.firstName =
                        data.firstName || teamMember.firstName;
                    teamMember.lastName = data.lastName || teamMember.lastName;
                    teamMember.position = data.position || teamMember.position;
                    teamMember.joinDate = data.joinDate || teamMember.joinDate;
                }
                return draft;
            }

            case Actions.ADMIN_CHANGE_PASSWORD_TEAM_MEMBER: {
                const payload =
                    action.payload as AdminChanePasswordTeamMemberAction["payload"];

                const teamMember = draft[payload.id];

                if (teamMember) {
                    teamMember.password = payload.password;
                }

                return draft;
            }

            default:
                return draft;
        }
    }
);

export { adminTeamMembersReducer };
