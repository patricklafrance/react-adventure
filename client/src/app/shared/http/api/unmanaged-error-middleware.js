import { API_UNMANAGED_ERROR, apiUnhandledError } from "@events";

import { push } from "connected-react-router";

export const unmanagedErrorMiddleware = ({ dispatch }) => next => async action => {
    const { type, payload } = action;

    if (type === API_UNMANAGED_ERROR) {
        dispatch(apiUnhandledError(payload));
        dispatch(push("/error"));
    }

    return next(action);
};
