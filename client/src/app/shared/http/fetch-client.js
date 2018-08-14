import { RequestError, UnauthorizedError, UnsupportedContentTypeError } from "./http-errors";

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

export async function get({ url, params }) {
    ensure(url, "url", "http.fetch-client.get").isNotNullOrEmpty();

    let requestUrl = url;

    if (!_.isNil(params)) {
        requestUrl = `${requestUrl}?${_convertParamsToUrlParameters(params)}`;
    }

    const options = _createRequestOptions({
        method: "GET"
    });

    return _execute({
        url: requestUrl,
        options
    });
}

export async function post({ url, params }) {
    ensure(url, "url", "http.fetch-client.post").isNotNullOrEmpty();

    const options = _createRequestOptions({
        method: "POST",
        body: params
    });

    return _execute({
        url,
        options
    });
}

async function _execute(request) {
    const { url, options } = request;
    const response = await fetch(url, options);

    if (response.ok) {
        if (response.headers.get("content-type").includes("application/json")) {
            try {
                return response.json();
            } catch (error) {
                throw new RequestError(request, response, error);
            }
        } else {
            throw new UnsupportedContentTypeError(request, response);
        }
    } else if (response.status === 401) {
        throw new UnauthorizedError(request, response);
    }

    throw new RequestError(request, response);
}
