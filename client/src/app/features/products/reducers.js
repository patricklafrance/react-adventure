import { combineReducers } from "redux";
import { listingReducers } from "./listing/reducers";

// TODO: Might need to combineReducers here.
export const productsReducer = {
    products: combineReducers({
        ...listingReducers
    })
};
