import { ActionType, Actions } from "../actions";
import { GlobalState } from "../state";

export const userReducer = (
    state: GlobalState,
    action: ActionType
): GlobalState => {
    if (action.type === Actions.INIT_USER) {
        return {
            ...state,
            user: action.payload,
        };
    }

    return state;
};
