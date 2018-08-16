import { HANDLE_BAD_REQUEST, TRIGGER_AND_HANDLE_BAD_REQUEST, TRIGGER_BAD_REQUEST, TRIGGER_BAD_REQUEST_WITH_EMPTY_RESPONSE, TRIGGER_BAD_REQUEST_WITH_HTML_RESPONSE, TRIGGER_UNMANAGED_ERROR } from "./actions";

import { get } from "@http/api";

const triggerBadRequestHandler = ({ dispatch, action: { type } }) => {
    if (type === TRIGGER_BAD_REQUEST) {
        dispatch(get({ url: "/400", onSuccess: "WILL NOT HAPPEN" }));
    }
};

const triggerBadRequestWithEmptyResponseHandler = ({ dispatch, action: { type } }) => {
    if (type === TRIGGER_BAD_REQUEST_WITH_EMPTY_RESPONSE) {
        dispatch(get({ url: "/400-empty", onSuccess: "WILL NOT HAPPEN" }));
    }
};

const triggerBadRequestWithHtmlResponseHandler = ({ dispatch, action: { type } }) => {
    if (type === TRIGGER_BAD_REQUEST_WITH_HTML_RESPONSE) {
        dispatch(get({ url: "/400-html", onSuccess: "WILL NOT HAPPEN" }));
    }
};

const triggerAndHandleBadRequest = ({ dispatch, action: { type } }) => {
    if (type === TRIGGER_AND_HANDLE_BAD_REQUEST) {
        dispatch(get({ url: "/400", onSuccess: "WILL NOT HAPPEN", onError: HANDLE_BAD_REQUEST }));
    }
};

const handleBadRequest = ({ dispatch, action: { type, payload } }) => {
    if (type === HANDLE_BAD_REQUEST) {
        console.log(`Handled bad request!\nData is: ${JSON.stringify(payload)}`);
    }
};

const triggerUnmanagedErrorHandler = ({ dispatch, action: { type } }) => {
    if (type === TRIGGER_UNMANAGED_ERROR) {
        dispatch(get({ url: "/500", onSuccess: "WILL NOT HAPPEN" }));
    }
};

export const testsHandlers = [triggerBadRequestHandler, triggerBadRequestWithEmptyResponseHandler, triggerUnmanagedErrorHandler, triggerBadRequestWithHtmlResponseHandler, triggerAndHandleBadRequest, handleBadRequest];
