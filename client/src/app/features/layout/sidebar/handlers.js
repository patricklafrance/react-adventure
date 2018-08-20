import { GET_PRODUCTS_COUNT, SET_PRODUCTS_COUNT } from "./actions";

import { PRODUCT_CREATED } from "@events/products";
import { get } from "@http/api";

const getProductsCount = (dispatch, { type }) => {
    if (type === GET_PRODUCTS_COUNT) {
        dispatch(get({ url: "/products/count", onSuccess: SET_PRODUCTS_COUNT }));
    }
};

const productsCreatedHandler = (dispatch, { type }) => {
    if (type === PRODUCT_CREATED) {
        dispatch(get({ url: "/products/count", onSuccess: SET_PRODUCTS_COUNT }));
    }
};

export const sidebarHandlers = [getProductsCount, productsCreatedHandler];
