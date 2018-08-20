const NAMESPACE = "[products.events]";

// export const PRODUCTS_COUNT_UPDATED = `${NAMESPACE} Products Count Updated`;
export const PRODUCT_CREATED = `${NAMESPACE} Product Created`;

// export function productsCountUpdated(newCount) {
//     return {
//         type: PRODUCTS_COUNT_UPDATED,
//         payload: {
//             newCount
//         }
//     };
// }

export function productCreated() {
    return {
        type: PRODUCT_CREATED,
        payload: {}
    };
}
