import { API_REQUEST, HTTP_METHODS } from "./actions";

import { API_UNHANDLED_ERROR } from "@events";
import { IS_DEBUG } from "@utils/env";
import { InvalidOperationError } from "@utils/errors";
import { get } from "@http";
import { isNotNullOrEmpty } from "@utils/types";

const requestMiddleware = async dispatch => async next => async ({ type, payload } = action) => {
    if (type === API_REQUEST) {
        const { method, url, params, onSuccess, onError } = payload;

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

const unhandledErrorLoggerMiddleware = async dispatch => async next => async ({ type, payload } = action) => {
    if (type === API_UNHANDLED_ERROR) {
        if (IS_DEBUG) {
            console.log(payload);
        }
    }

    return next(action);
};

async function handleRequest(request, onSuccess, onError) {
    try {
        const response = await request();
        dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
        // TODO: Logic should be:
        // if is unmanaged error
        //     dispatch unmanaged error event
        // else if onError is not null
        //     dispatch onError
        // else
        //     dispatch unhandled error event
        if (isNotNullOrEmpty(onError)) {
            dispatch({ type: onError, payload: error });
        } else {
            dispatch({ type: API_UNHANDLED_ERROR, payload: error });
        }
    }
}

export const apiRequestMiddlewares = [requestMiddleware, unhandledErrorLoggerMiddleware];