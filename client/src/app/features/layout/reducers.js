import { combineReducers } from "redux";
import { sidebarReducer } from "./sidebar/reducers";

export const layoutReducer = {
    layout: combineReducers({
        ...sidebarReducer
    })
};
