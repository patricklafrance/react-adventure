import { ensure } from "@utils/contracts";

const NAMESPACE = "[http.api]";

export const API_REQUEST = `${NAMESPACE} Request`;

export const HTTP_METHODS = {
    get: "GET"
};

function apiRequest(method, url, params, onSuccess, onError) {
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

// TODO: Add documentation header
export function get({ url, params, onSuccess, onError }) {
    ensure(url, "url", "api.actions.get").isNotNullOrEmpty();
    ensure(onSuccess, "onSuccess", "api.actions.get").isNotNullOrEmpty();

    return apiRequest(HTTP_METHODS.get, url, params, onSuccess, onError);
}
