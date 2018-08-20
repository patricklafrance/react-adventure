const NAMESPACE = "[layout.sidebar]";

export const GET_PRODUCTS_COUNT = `${NAMESPACE} Get Products Count`;
export const SET_PRODUCTS_COUNT = `${NAMESPACE} Set Products Count`;

export function getProductCount() {
    return {
        type: GET_PRODUCTS_COUNT,
        payload: {}
    };
}
