const NAMESPACE = "[product listing]";

export const PRODUCT_LISTING_ACTIONS = {
    getProducts: `${NAMESPACE} Get Products`,
    setProducts: `${NAMESPACE} Set Products`
};

export function getProducts() {
    return {
        type: PRODUCT_LISTING_ACTIONS.getProducts,
        payload: {}
    };
}

export function setProducts(products) {
    return {
        type: PRODUCT_LISTING_ACTIONS.setProducts,
        payload: {
            products: products
        }
    };
}
