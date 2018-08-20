const NAMESPACE = "[products.add]";

export const CREATE_PRODUCT = `${NAMESPACE} Create Product`;

export function createProduct({ name, brand, categories = [], merchantId = 1 }) {
    return {
        type: CREATE_PRODUCT,
        payload: {
            name,
            brand,
            categories,
            merchantId
        }
    };
}
