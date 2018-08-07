import { ensure } from "@utils/contracts";

const NAMESPACE = "[api]";

export const API_ACTIONS = {
    request: `${NAMESPACE} Request`,
    unmanagedError: `${NAMESPACE} Unmanaged Error`
    // success: `${NAMESPACE} Success`,
    // error: `${NAMESPACE} Error`,
    // completed: `${NAMESPACE} Completed`
};

export const HTTP_METHODS = {
    get: "GET"
};

function apiRequest(method, url, params, onSuccess, onError) {
    return {
        type: API_ACTIONS.request,
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
export function get(instructions = {}) {
    const { url, params, onSuccess, onError } = instructions;

    ensure(method, "method", "api.actions.get").isNotNullOrEmpty();
    ensure(url, "url", "api.actions.get").isNotNullOrEmpty();
    ensure(onSuccess, "onSuccess", "api.actions.get").isNotNullOrEmpty();

    return apiRequest("GET", url, params, onSuccess, onError);
}
