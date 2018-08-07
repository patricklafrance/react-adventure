import { PRODUCT_LISTING_ACTIONS } from "@actions";

const INITIAL_STATE = {
    products: []
};

function setProducts(state, payload) {
    return {
        products: payload.products
    };
}

export function productListingReducer(state = INITIAL_STATE, { type, payload }) {
    switch (type) {
        case PRODUCT_LISTING_ACTIONS.setProducts:
            return setProducts(state, payload);
        default:
            return state;
    }
}
