import { combineReducers } from "redux";
import { listingReducer } from "./listing/reducers";

export const productsReducer = {
    products: combineReducers({
        ...listingReducer
    })
};
