import { listingReducer } from "./listing/reducers";

// TODO: Might need to combineReducers here.
export const productsReducer = {
    products: {
        ...listingReducer
    }
};
