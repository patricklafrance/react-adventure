import { SET_PRODUCTS } from "./actions";
import { createReducer } from "@utils/redux";

// import { combineReducers } from "redux";

// TODO: Pas certains que ça fonctionne ça avec plusieurs fichiers de reducers?
const INITIAL_STATE = {
    products: []
};

// TODO: Pas certains que ça fonctionne ça avec plusieurs fichiers de reducers?
// Doit probablement
// return {
//    ...state,
//    products: payload
// }
function setProducts(state, payload) {
    return {
        ...state,
        products: payload
    };
}

const reducers = {
    [SET_PRODUCTS]: setProducts
};

export const listingReducers = {
    listing: createReducer(INITIAL_STATE, reducers, "products.listing.reducer")
};

// function reducer(state = INITIAL_STATE, { type, payload }) {
//     switch (type) {
//         case SET_PRODUCTS:
//             return setProducts(state, payload);
//         default:
//             return state;
//     }
// }

// // TODO: Might need to combineReducers here.
// export const listingReducer = combineReducers({
//     listing: reducer
// });
