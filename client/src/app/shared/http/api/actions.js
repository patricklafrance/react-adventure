import _ from "lodash";
import { ensure } from "@utils/contracts";

const NAMESPACE = "[http.api]";

export const API_REQUEST = `${NAMESPACE} Request`;

export const HTTP_METHODS = {
    get: "GET",
    post: "POST"
};

export function get(action, { url, success, error }) {
    ensure(action, "action", "api.actions.get").isNotNull();
    ensure(url, "url", "api.actions.get").isNotNullOrEmpty();
    ensure(success, "success", "api.actions.get").isTrue(x => _.isString(x) || _.isFunction(x) || _.isPlainObject(x));

    return withApiMetadata(action, HTTP_METHODS.get, url, success, error);
}

export function post(action, { url, success, error }) {
    ensure(url, "url", "api.actions.post").isNotNullOrEmpty();
    ensure(success, "success", "api.actions.post").isTrue(x => _.isString(x) || _.isFunction(x) || _.isPlainObject(x));

    return withApiMetadata(action, HTTP_METHODS.post, url, success, error);
}

function withApiMetadata(action, method, url, success, error) {
    return Object.assign({}, action, {
        meta: {
            api: {
                method,
                url,
                success,
                error
            }
        }
    });
}
