// TODO: I think I should provide some kind of handler wrapper.

import { PRODUCT_LISTING_ACTIONS } from "./actions";
import { apiRequest } from "";

export const getProductsHandler = async dispatch => async next => async action => {
    next(action);

    if (action.type === PRODUCT_LISTING_ACTIONS.getProducts) {
        dispatch(apiRequest);
    }
};
