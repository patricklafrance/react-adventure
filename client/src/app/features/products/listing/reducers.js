import { PRODUCT_UPVOTED, SET_PRODUCTS } from "./actions";

import { createReducer } from "@redux";

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
        products: [...payload.data]
    };
}

// TODO: Extract utility in immutability.js
function productUpvoted(state, payload) {
    return {
        ...state,
        products: state.products.map(x => (x.id === payload.productId ? { ...x, voteCount: x.voteCount + 1 } : x))
    };
}

const reducers = {
    [SET_PRODUCTS]: setProducts,
    [PRODUCT_UPVOTED]: productUpvoted
};

export const listingReducer = {
    listing: createReducer(INITIAL_STATE, reducers, "products.listing.reducer")
};
