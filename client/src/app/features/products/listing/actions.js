const NAMESPACE = "[products.listing]";

export const GET_PRODUCTS = `${NAMESPACE} Get Products`;
export const SET_PRODUCTS = `${NAMESPACE} Set Products`;
export const GET_PRODUCT = `${NAMESPACE} Get Product`;
export const SET_PRODUCT = `${NAMESPACE} Set Product`;
export const UPVOTE_PRODUCT = `${NAMESPACE} Upvote Products`;
export const PRODUCT_UPVOTED = `${NAMESPACE} Product Upvoted`;

export function getProducts() {
    return {
        type: GET_PRODUCTS,
        payload: {}
    };
}

export function getProduct(productId) {
    return {
        type: GET_PRODUCT,
        payload: {
            productId: productId
        }
    };
}

export function upvoteProduct(productId) {
    return {
        type: UPVOTE_PRODUCT,
        payload: {
            productId: productId
        }
    };
}

export function productUpvoted(productId) {
    return {
        type: PRODUCT_UPVOTED,
        payload: {
            productId: productId
        }
    };
}
