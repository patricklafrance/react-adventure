import { API_REQUEST, HTTP_METHODS } from "./actions";
import { BAD_REQUEST_ERROR, UNAUTHORIZED_ERROR, get, post } from "@http";
import { apiUnauthorizedError, apiUnhandledError, apiUnmanagedError } from "@events/http";

import { InvalidOperationError } from "@utils/errors";
import _ from "lodash";
import { middleware } from "@redux";

export const requestMiddleware = middleware(async ({ dispatch }, { type, payload, meta }) => {
    if (type === API_REQUEST) {
        const { method, url, success, error } = meta.api;

        switch (method) {
            case HTTP_METHODS.get:
                await handleRequest(() => get({ url: toAbsoluteApiUrl(url), data: payload }), success, error, dispatch);
                break;
            case HTTP_METHODS.post:
                await handleRequest(() => post({ url: toAbsoluteApiUrl(url), data: payload }), success, error, dispatch);
                break;
            default:
                throw new InvalidOperationError(`http.api.request-middleware - The HTTP method "${method}" is not supported`);
        }
    }
});

async function handleRequest(request, onSuccess, onError, dispatch) {
    const { ok, content, error } = await request();

    if (ok) {
        handleSuccess({ content }, onSuccess, dispatch);
    } else {
        if (error.code === BAD_REQUEST_ERROR) {
            handleBadRequest({ content }, error, onError, dispatch);
        } else if (error.code === UNAUTHORIZED_ERROR) {
            dispatch(apiUnauthorizedError());
        } else {
            dispatch(apiUnmanagedError(error));
        }
    }
}

function handleSuccess(response, callback, dispatch) {
    const action = resolveRequestCallback(callback, response);
    dispatch(action);
}

function handleBadRequest(response, error, callback, dispatch) {
    if (!_.isNil(callback)) {
        const action = resolveRequestCallback(callback, response);
        dispatch(action);
    } else {
        dispatch(apiUnhandledError(error));
    }
}

function resolveRequestCallback(callback, { content }) {
    if (_.isString(callback)) {
        return { type: callback, payload: content };
    } else if (_.isPlainObject(callback)) {
        return callback;
    } else if (_.isFunction(callback)) {
        return callback(content);
    }

    throw new InvalidOperationError("http.api.request-middleware - Couldn't resolve an action from the specified callback (onSuccess or onError).");
}

function toAbsoluteApiUrl(relativeUrl) {
    return `http://localhost:5000/api${relativeUrl}`;
}
