import { combineReducers } from "redux";
import { listingReducer } from "./listing/reducers";

// TODO: Might need to combineReducers here.
export const productsReducer = {
    products: combineReducers({
        ...listingReducer
    })
};
