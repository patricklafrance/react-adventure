import { PRODUCT_CREATED } from "@events/products";
import { push } from "connected-react-router";

const productCreatedHandler = (dispatch, { type, payload }) => {
    if (type === PRODUCT_CREATED) {
        dispatch(push("/products"));
    }
};

export const addHandlers = [productCreatedHandler];
