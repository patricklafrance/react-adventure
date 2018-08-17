import { PRODUCT_UPVOTED, SET_PRODUCTS } from "./actions";

import { createReducer } from "@redux";

const INITIAL_STATE = {
    products: []
};

function setProducts(state, payload) {
    return {
        ...state,
        products: [...payload.data]
    };
}

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
