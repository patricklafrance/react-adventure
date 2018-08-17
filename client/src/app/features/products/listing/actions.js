import { ensure } from "@utils/contracts";

const NAMESPACE = "[products.listing]";

export const GET_PRODUCTS = `${NAMESPACE} Get Products`;
export const SET_PRODUCTS = `${NAMESPACE} Set Products`;
export const UPVOTE_PRODUCT = `${NAMESPACE} Upvote Products`;
export const PRODUCT_UPVOTED = `${NAMESPACE} Product Upvoted`;

export function getProducts() {
    return {
        type: GET_PRODUCTS,
        payload: {}
    };
}

export function setProducts(products) {
    ensure(products, "products", "product.listing.setProducts").isNotNull();

    return {
        type: SET_PRODUCTS,
        payload: {
            products: products
        }
    };
}

export function upvoteProduct(productId) {
    ensure(productId, "productId", "product.listing.upvoteProduct").isNotNull();

    return {
        type: UPVOTE_PRODUCT,
        payload: {
            productId: productId
        }
    };
}

export function productUpvoted(productId) {
    ensure(productId, "productId", "product.listing.productUpvoted").isNotNull();

    return {
        type: PRODUCT_UPVOTED,
        payload: {
            productId: productId
        }
    };
}
