import { ensure } from "@utils/contracts";

const NAMESPACE = "[http.events]";

export const API_UNMANAGED_ERROR = `${NAMESPACE} Api Unmanaged Error`;
export const API_UNHANDLED_ERROR = `${NAMESPACE} Api Unhandled Error`;
export const API_UNAUTHORIZED_ERROR = `${NAMESPACE} Api Unauthorized Error`;

export function apiUnmanagedError(error) {
    ensure(error, "error", "http.events.apiUnhandledError").isNotNull();

    return {
        type: API_UNMANAGED_ERROR,
        payload: error
    };
}

export function apiUnhandledError(error) {
    ensure(error, "error", "http.events.apiUnhandledError").isNotNull();

    return {
        type: API_UNHANDLED_ERROR,
        payload: error
    };
}

export function apiUnauthorizedError() {
    return {
        type: API_UNAUTHORIZED_ERROR,
        payload: {}
    };
}
