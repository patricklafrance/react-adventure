import { HttpError } from "./http-errors";
import { IS_DEBUG } from "@utils/env";
import _ from "lodash";
import { ensure } from "@utils/contracts";

function _convertParamsToUrlParameters(params) {
    return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join("&");
}

function _createRequestOptions({ method, body }) {
    // https://github.github.io/fetch/#options
    return {
        method: method,
        body: body
    };
}

function _throwResponseError({ status, statusText, body, url }) {
    // 4xx and 5xx errors
    throw new HttpError(statusText, {
        status,
        statusText,
        body,
        url
    });
}

export async function get({ url, params }) {
    ensure.isNullOrEmpty(url, "url", "fetch-client.get").isNullOrEmpty();

    let requestUrl = url;

    if (!_.isNil(params)) {
        requestUrl = `${requestUrl}?${_convertParamsToUrlParameters(params)}`;
    }

    const options = _createRequestOptions({
        method: "GET"
    });

    return _execute(requestUrl, options);
}

export async function post({ url, params }) {
    ensure.isNullOrEmpty(url, "url", "fetch-client.post").isNullOrEmpty();

    const options = _createRequestOptions({
        method: "POST",
        body: params
    });

    return _execute(url, options);
}

async function _execute(url, options) {
    if (IS_DEBUG) {
        console.log(`Sending at: ${url}`);
    }

    const response = await fetch(url, options);

    if (response.ok) {
        if (IS_DEBUG) {
            console.log(`Received response for: ${url}`);
        }

        return response.json();
    }

    _throwResponseError(response);
}
