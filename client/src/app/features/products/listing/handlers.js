// TODO: I think I should provide some kind of handler wrapper.

import { GET_PRODUCTS, SET_PRODUCTS } from "./actions";

import { get } from "@http/api";

const getProductsHandler = async dispatch => async next => async ({ type, payload } = action) => {
    next(action);

    if (type === GET_PRODUCTS) {
        dispatch(get({ url: "/products", onSuccess: SET_PRODUCTS }));
    }
};

export const listingHandlers = [getProductsHandler];
