import { get } from "@http/api";

const NAMESPACE = "[layout.sidebar]";

export const GET_PRODUCTS_COUNT = `${NAMESPACE} Get Products Count`;
export const SET_PRODUCTS_COUNT = `${NAMESPACE} Set Products Count`;

export function getProductCount() {
    const action = {
        type: GET_PRODUCTS_COUNT,
        payload: {}
    };

    return get(action, { url: "/products/count", success: SET_PRODUCTS_COUNT });
}
