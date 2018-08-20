import { API_UNMANAGED_ERROR, apiUnhandledError } from "@events/http";

import { middleware } from "@redux";
import { push } from "connected-react-router";

export const unmanagedErrorMiddleware = middleware(({ dispatch }, { type, payload }) => {
    if (type === API_UNMANAGED_ERROR) {
        dispatch(apiUnhandledError(payload));
        dispatch(push("/error"));
    }
});
