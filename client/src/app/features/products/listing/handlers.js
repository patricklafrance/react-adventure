import { PRODUCT_UPVOTED, getProduct } from "./actions";

const productUpvotedHandler = (dispatch, { type, payload }) => {
    if (type === PRODUCT_UPVOTED) {
        dispatch(getProduct(payload.productId));
    }
};

export const listingHandlers = [productUpvotedHandler];
