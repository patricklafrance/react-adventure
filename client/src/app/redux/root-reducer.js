import { combineReducers } from "redux";
import { counterReducer } from "@features/counter";
import { productsReducer } from "@features/products";

export const rootReducer = combineReducers({
    ...counterReducer,
    ...productsReducer
});
