import { GET_PRODUCT, GET_PRODUCTS, PRODUCT_UPVOTED, SET_PRODUCT, SET_PRODUCTS, UPVOTE_PRODUCT, getProduct, productUpvoted } from "./actions";
import { get, post } from "@http/api";

const getProductsHandler = (dispatch, { type }) => {
    if (type === GET_PRODUCTS) {
        dispatch(get({ url: "/products", onSuccess: SET_PRODUCTS }));
    }
};

const upvoteProductHandler = (dispatch, { type, payload }) => {
    if (type === UPVOTE_PRODUCT) {
        dispatch(post({ url: "/products/upvote", params: payload, onSuccess: productUpvoted(payload.productId) }));
    }
};

const productUpvotedHandler = (dispatch, { type, payload }) => {
    if (type === PRODUCT_UPVOTED) {
        dispatch(getProduct(payload.productId));
    }
};

const getProductHandler = (dispatch, { type, payload }) => {
    if (type === GET_PRODUCT) {
        dispatch(get({ url: `/products/${payload.productId}`, params: null, onSuccess: SET_PRODUCT }));
    }
};

export const listingHandlers = [getProductsHandler, upvoteProductHandler, productUpvotedHandler, getProductHandler];
