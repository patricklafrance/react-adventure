import { get } from "@http/api";

const NAMESPACE = "[playground]";

export const TRIGGER_BAD_REQUEST = `${NAMESPACE} Trigger Bad Request`;
export const TRIGGER_BAD_REQUEST_WITH_EMPTY_RESPONSE = `${NAMESPACE} Trigger Bad Request With Empty Response`;
export const TRIGGER_BAD_REQUEST_WITH_HTML_RESPONSE = `${NAMESPACE} Trigger Bad Request With HTML Response`;
export const TRIGGER_AND_HANDLE_BAD_REQUEST = `${NAMESPACE} Trigger And Handle Bad Request`;
export const HANDLE_BAD_REQUEST = `${NAMESPACE} Handle Bad Request`;

export const TRIGGER_UNMANAGED_ERROR = `${NAMESPACE} Trigger Unmanaged Error`;

export function triggerBadRequest() {
    const action = {
        type: TRIGGER_BAD_REQUEST,
        payload: {}
    };

    return get(action, { url: "/errors/400", success: "WILL NOT HAPPEN" });
}

export function triggerBadRequestwithEmptyResponse() {
    const action = {
        type: TRIGGER_BAD_REQUEST_WITH_EMPTY_RESPONSE,
        payload: {}
    };

    return get(action, { url: "/errors/400/empty", success: "WILL NOT HAPPEN" });
}

export function triggerBadRequestwithHtmlResponse() {
    const action = {
        type: TRIGGER_BAD_REQUEST_WITH_HTML_RESPONSE,
        payload: {}
    };

    return get(action, { url: "/errors/400/html", success: "WILL NOT HAPPEN" });
}

export function triggerAndHandleBadRequest() {
    const action = {
        type: TRIGGER_AND_HANDLE_BAD_REQUEST,
        payload: {}
    };

    return get(action, { url: "/errors/400", success: "WILL NOT HAPPEN", error: HANDLE_BAD_REQUEST });
}

export function triggerUnmanagedError() {
    const action = {
        type: TRIGGER_UNMANAGED_ERROR,
        payload: {}
    };

    return get(action, { url: "/errors/500", success: "WILL NOT HAPPEN" });
}
