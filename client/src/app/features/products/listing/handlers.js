import { GET_PRODUCTS, SET_PRODUCTS, UPVOTE_PRODUCT, productUpvoted } from "./actions";
import { get, post } from "@http/api";

const getProductsHandler = ({ dispatch, action: { type } }) => {
    if (type === GET_PRODUCTS) {
        dispatch(get({ url: "/products", onSuccess: SET_PRODUCTS }));
    }
};

const upvoteProductHandler = ({ dispatch, action: { type, payload } }) => {
    if (type === UPVOTE_PRODUCT) {
        dispatch(post({ url: "/products/upvote", params: payload, onSuccess: productUpvoted(payload.productId) }));
    }
};

export const listingHandlers = [getProductsHandler, upvoteProductHandler];
