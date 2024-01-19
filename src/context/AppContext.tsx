import React, { useState, createContext, useReducer } from "react";
import {
    GlobalState,
    initialState,
    userReducer,
    InitUserAction,
    ActionType,
} from "../store/";

type AppContextType = {
    state: GlobalState;
    dispatch(action: ActionType): void;
};

export const AppContext = createContext<AppContextType>({
    state: initialState,
    dispatch: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer<
        React.Reducer<GlobalState, ActionType>
    >(userReducer, initialState);
    const value = {
        state,
        dispatch,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
