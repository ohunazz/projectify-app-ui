import { useContext } from "react";
import { AppContext } from "../context";

export const useStore = () => {
    const { dispatch, state } = useContext(AppContext);

    return { dispatch, state };
};
