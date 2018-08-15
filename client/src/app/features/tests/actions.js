export const TRIGGER_BAD_REQUEST = "Trigger Bad Request";
export const TRIGGER_UNMANAGED_ERROR = "Trigger Unmanaged Error";

export function triggerBadRequest() {
    return {
        type: TRIGGER_BAD_REQUEST,
        payload: {}
    };
}

export function triggerUnmanagedError() {
    return {
        type: TRIGGER_UNMANAGED_ERROR,
        payload: {}
    };
}