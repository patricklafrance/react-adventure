import { get, post } from "@http/api";

const NAMESPACE = "[products.listing]";

export const GET_PRODUCTS = `${NAMESPACE} Get Products`;
export const SET_PRODUCTS = `${NAMESPACE} Set Products`;
export const GET_PRODUCT = `${NAMESPACE} Get Product`;
export const SET_PRODUCT = `${NAMESPACE} Set Product`;
export const UPVOTE_PRODUCT = `${NAMESPACE} Upvote Products`;
export const PRODUCT_UPVOTED = `${NAMESPACE} Product Upvoted`;

export function getProducts() {
    const action = {
        type: GET_PRODUCTS,
        payload: {}
    };

    return get(action, { url: "/products", success: SET_PRODUCTS });
}

export function getProduct(productId) {
    const action = {
        type: GET_PRODUCT,
        payload: {
            productId: productId
        }
    };

    return get(action, { url: `/products/${productId}`, success: SET_PRODUCT });
}

export function upvoteProduct(productId) {
    const action = {
        type: UPVOTE_PRODUCT,
        payload: {
            productId: productId
        }
    };

    return post(action, { url: "/products/upvote", success: productUpvoted(productId) });
}

export function productUpvoted(productId) {
    return {
        type: PRODUCT_UPVOTED,
        payload: {
            productId: productId
        }
    };
}
