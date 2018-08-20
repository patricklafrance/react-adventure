import { SET_PRODUCTS_COUNT } from "./actions";
import { createReducer } from "@redux";

const INITIAL_STATE = {
    productsCount: 0
};

function setProductsCount(state, { count }) {
    return {
        ...state,
        productsCount: count
    };
}

const reducers = {
    [SET_PRODUCTS_COUNT]: setProductsCount
};

export const sidebarReducer = {
    sidebar: createReducer(INITIAL_STATE, reducers, "layout.sidebar.reducer")
};
