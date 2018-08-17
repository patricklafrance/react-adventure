import { ensure } from "@utils/contracts";

const NAMESPACE = "[http.api]";

export const API_REQUEST = `${NAMESPACE} Request`;

export const HTTP_METHODS = {
    get: "GET",
    post: "POST"
};

function request(method, url, params, onSuccess, onError) {
    // TODO: set method, url, onSuccess and onError as meta
    return {
        type: API_REQUEST,
        payload: {
            method,
            url,
            params,
            onSuccess,
            onError
        }
    };
}

// TODO: ensure onSuccess is string, object or function
export function get({ url, params, onSuccess, onError }) {
    ensure(url, "url", "api.actions.get").isNotNullOrEmpty();
    ensure(onSuccess, "onSuccess", "api.actions.get").isNotNull();

    return request(HTTP_METHODS.get, url, params, onSuccess, onError);
}

// TODO: ensure onSuccess is string, object or function
export function post({ url, params, onSuccess, onError }) {
    ensure(url, "url", "api.actions.post").isNotNullOrEmpty();
    ensure(onSuccess, "onSuccess", "api.actions.post").isNotNull();

    return request(HTTP_METHODS.post, url, params, onSuccess, onError);
}
