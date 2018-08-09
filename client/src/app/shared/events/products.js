const NAMESPACE = "[products.events]";

export const PRODUCTS_COUNT_UPDATED = `[products.events] Products Count Updated`;

export function productsCountUpdated(newCount) {
    return {
        type: PRODUCTS_COUNT_UPDATED,
        payload: {
            newCount
        }
    };
}
