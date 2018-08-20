import { SET_PRODUCT, SET_PRODUCTS } from "./actions";

import { createReducer } from "@redux";

const INITIAL_STATE = {
    products: []
};

function setProducts(state, { products }) {
    return {
        ...state,
        products: [...products]
    };
}

function setProduct(state, product) {
    return {
        ...state,
        products: state.products.map(x => (x.id === product.id ? product : x))
    };
}

const reducers = {
    [SET_PRODUCTS]: setProducts,
    [SET_PRODUCT]: setProduct
};

export const listingReducer = {
    listing: createReducer(INITIAL_STATE, reducers, "products.listing.reducer")
};
