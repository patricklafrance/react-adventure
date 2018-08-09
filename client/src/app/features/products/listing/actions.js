const NAMESPACE = "[products.listing]";

export const GET_PRODUCTS = `${NAMESPACE} Get Products`;
export const SET_PRODUCTS = `${NAMESPACE} Set Products`;

export function getProducts() {
    return {
        type: GET_PRODUCTS,
        payload: {}
    };
}

export function setProducts(products) {
    return {
        type: SET_PRODUCTS,
        payload: {
            products: products
        }
    };
}
