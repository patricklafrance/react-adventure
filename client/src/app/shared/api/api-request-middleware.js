import { API_ACTIONS, HTTP_METHODS } from "./actions";

import { IS_DEBUG } from "@utils/env";
import { InvalidOperationError } from "@utils/errors";
import { get } from "@services/http";
import { isNotNullOrEmpty } from "@utils/types";

export const apiRequestMiddleware = async dispatch => async next => async action => {
    if (action === API_ACTIONS.request) {
        const { method, url, params, onSuccess, onError } = action.payload;

        switch (method) {
            case HTTP_METHODS.get:
                handleRequest(() => get({ url, params }), onSuccess, onError);
                break;
            default:
                throw new InvalidOperationError(`API request middleware doesn't support the HTTP method "${method}"`);
        }
    }

    return next(action);
};

async function handleRequest(request, onSuccess, onError) {
    try {
        const response = await request();
        dispatch({ type: onSuccess, payload: response });
    } catch (error) {
        // What about unmanaged errors?
        // Error handling should be different based on the response type
        if (isNotNullOrEmpty(onError)) {
            dispatch({ type: onError, payload: error });
        } else if (IS_DEBUG) {
            console.log("Unhandled HTTP error: ", error);
        }
    }
}
