import { PRODUCT_CREATED } from "@events/products";
import { post } from "@http/api";

const NAMESPACE = "[products.add]";

export const CREATE_PRODUCT = `${NAMESPACE} Create Product`;

export function createProduct({ name, brand, categories = [], merchantId = 1 }) {
    const action = {
        type: CREATE_PRODUCT,
        payload: {
            name,
            brand,
            categories,
            merchantId
        }
    };

    return post(action, { url: "/products/new", success: PRODUCT_CREATED });
}
