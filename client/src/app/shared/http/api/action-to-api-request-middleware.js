import { API_REQUEST } from "./actions";
import _ from "lodash";
import { middleware } from "@redux";

export const actionToApiRequestMiddleware = middleware(({ dispatch }, { type, payload, meta = {} }) => {
    if (type !== API_REQUEST && !_.isNil(meta.api)) {
        dispatch({
            type: API_REQUEST,
            payload: payload,
            meta: {
                api: meta.api
            }
        });
    }
});
