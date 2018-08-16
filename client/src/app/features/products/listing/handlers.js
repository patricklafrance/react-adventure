import { GET_PRODUCTS, SET_PRODUCTS } from "./actions";

import { get } from "@http/api";

const getProductsHandler = ({ dispatch, action: { type } }) => {
    if (type === GET_PRODUCTS) {
        dispatch(get({ url: "/products", onSuccess: SET_PRODUCTS }));
    }
};

export const listingHandlers = [getProductsHandler];
