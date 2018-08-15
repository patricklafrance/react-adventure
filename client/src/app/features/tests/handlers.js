import { TRIGGER_BAD_REQUEST, TRIGGER_UNMANAGED_ERROR } from "./actions";

import { get } from "@http/api";

const triggerBadRequestHandler = ({ dispatch }) => next => action => {
    var result = next(action);

    const { type } = action;

    if (type === TRIGGER_BAD_REQUEST) {
        dispatch(get({ url: "/400", onSuccess: "WILL NOT HAPPEN" }));
    }

    return result;
};

const triggerUnmanagedErrorHandler = ({ dispatch }) => next => action => {
    var result = next(action);

    const { type } = action;

    if (type === TRIGGER_UNMANAGED_ERROR) {
        dispatch(get({ url: "/500", onSuccess: "WILL NOT HAPPEN" }));
    }

    return result;
};

export const testsHandlers = [triggerBadRequestHandler, triggerUnmanagedErrorHandler];
