import { PRODUCT_CREATED } from "@events/products";
import { getProductCount } from "./actions";

const productsCreatedHandler = (dispatch, { type }) => {
    if (type === PRODUCT_CREATED) {
        dispatch(getProductCount());
    }
};

export const sidebarHandlers = [productsCreatedHandler];
