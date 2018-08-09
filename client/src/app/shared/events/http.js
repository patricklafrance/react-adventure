const NAMESPACE = "[http.events]";

export const API_UNMANAGED_ERROR = `${NAMESPACE} API Unmanaged Error`;
export const API_UNHANDLED_ERROR = `${NAMESPACE} API Unhandled Error`;

export function apiUnmanagedError(payload) {
    return {
        type: API_UNMANAGED_ERROR,
        payload: payload
    };
}

export function apiUnhandledError(payload) {
    return {
        type: API_UNHANDLED_ERROR,
        payload: payload
    };
}
