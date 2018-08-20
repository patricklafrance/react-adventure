import { CREATE_PRODUCT } from "./actions";
import { PRODUCT_CREATED } from "@events/products";
import { post } from "@http/api";
import { push } from "connected-react-router";

const createProductHandler = (dispatch, { type, payload }) => {
    if (type === CREATE_PRODUCT) {
        dispatch(post({ url: "/products/new", params: payload, onSuccess: PRODUCT_CREATED }));
    }
};

const productCreatedHandler = (dispatch, { type, payload }) => {
    if (type === PRODUCT_CREATED) {
        dispatch(push("/products"));
    }
};

export const addHandlers = [createProductHandler, productCreatedHandler];
