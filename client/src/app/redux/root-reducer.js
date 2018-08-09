import { combineReducers } from "redux";
import { featuresReducer } from "@features/reducers";

export const rootReducer = combineReducers({
    ...featuresReducer
});
