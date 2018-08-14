// TODO: I think I should provide some kind of handler wrapper.

import { GET_PRODUCTS, SET_PRODUCTS } from "./actions";

import { get } from "@http/api";

const getProductsHandler = ({ dispatch }) => next => action => {
    var result = next(action);

    const { type } = action;

    if (type === GET_PRODUCTS) {
        dispatch(get({ url: "/products", onSuccess: SET_PRODUCTS }));
    }

    return result;
};

export const listingHandlers = [getProductsHandler];
