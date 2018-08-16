const NAMESPACE = "[test]";

export const TRIGGER_BAD_REQUEST = `${NAMESPACE} Trigger Bad Request`;
export const TRIGGER_BAD_REQUEST_WITH_EMPTY_RESPONSE = `${NAMESPACE} Trigger Bad Request With Empty Response`;
export const TRIGGER_BAD_REQUEST_WITH_HTML_RESPONSE = `${NAMESPACE} Trigger Bad Request With HTML Response`;
export const TRIGGER_AND_HANDLE_BAD_REQUEST = `${NAMESPACE} Trigger And Handle Bad Request`;
export const HANDLE_BAD_REQUEST = `${NAMESPACE} Handle Bad Request`;

export const TRIGGER_UNMANAGED_ERROR = `${NAMESPACE} Trigger Unmanaged Error`;

export function triggerBadRequest() {
    return {
        type: TRIGGER_BAD_REQUEST,
        payload: {}
    };
}

export function triggerBadRequestwithEmptyResponse() {
    return {
        type: TRIGGER_BAD_REQUEST_WITH_EMPTY_RESPONSE,
        payload: {}
    };
}

export function triggerBadRequestwithHtmlResponse() {
    return {
        type: TRIGGER_BAD_REQUEST_WITH_HTML_RESPONSE,
        payload: {}
    };
}

export function triggerAndHandleBadRequest() {
    return {
        type: TRIGGER_AND_HANDLE_BAD_REQUEST,
        payload: {}
    };
}

export function triggerUnmanagedError() {
    return {
        type: TRIGGER_UNMANAGED_ERROR,
        payload: {}
    };
}
