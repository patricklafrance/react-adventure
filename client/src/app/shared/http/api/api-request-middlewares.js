import { API_REQUEST, HTTP_METHODS } from "./actions";
import { API_UNHANDLED_ERROR, API_UNMANAGED_ERROR, apiUnauthorizedError, apiUnhandledError, apiUnmanagedError } from "@events";
import { BAD_REQUEST_ERROR, UNAUTHORIZED_ERROR, get } from "@http";

import { IS_DEBUG } from "@utils/env";
import { InvalidOperationError } from "@utils/errors";
import _ from "lodash";
import { isNotNullOrEmpty } from "@utils/types";
import { push } from "connected-react-router";

const requestMiddleware = ({ dispatch }) => next => async action => {
    const { type, payload } = action;

    if (type === API_REQUEST) {
        const { method, url, params, onSuccess, onError } = payload;

        switch (method) {
            case HTTP_METHODS.get:
                await handleRequest(() => get({ url: toAbsoluteApiUrl(url), params }), onSuccess, onError, dispatch);
                break;
            default:
                throw new InvalidOperationError(`Api request middleware doesn't support the HTTP method "${method}"`);
        }
    }

    return next(action);
};

const unhandledErrorLoggerMiddleware = ({ dispatch }) => next => async action => {
    const { type, payload } = action;

    if (type === API_UNHANDLED_ERROR) {
        if (IS_DEBUG) {
            const { code, message, request, response } = payload;

            let output = `An unhandled error occurred.\nCode: ${code}\nMessage: ${message}\nRequest: ${JSON.stringify(request, 4)}`;

            if (!_.isNil(response)) {
                const responseContent = await response.content();
                output += `\nResponse: ${JSON.stringify(response, 4)}\nContent: ${responseContent}`;
            }

            console.error(output);
        }
    }

    return next(action);
};

const unmanagedErrorMiddleware = ({ dispatch }) => next => async action => {
    const { type } = action;

    if (type === API_UNMANAGED_ERROR) {
        console.log("A");
        dispatch(push("/error"));
    }

    return next(action);
};

async function handleRequest(request, onSuccess, onError, dispatch) {
    const { ok, content, error } = await request();

    if (ok) {
        dispatch({ type: onSuccess, payload: content.data });
    } else {
        if (error.code === BAD_REQUEST_ERROR) {
            if (isNotNullOrEmpty(onError)) {
                dispatch({ type: onError, payload: error.data });
            } else {
                dispatch(apiUnhandledError(error));
            }
        } else if (error.code === UNAUTHORIZED_ERROR) {
            dispatch(apiUnauthorizedError());
        } else {
            dispatch(apiUnmanagedError(error));
        }
    }
}

function toAbsoluteApiUrl(relativeUrl) {
    return `http://localhost:5000${relativeUrl}`;
}

export const apiRequestMiddlewares = [requestMiddleware, unhandledErrorLoggerMiddleware, unmanagedErrorMiddleware];
