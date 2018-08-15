import { HttpRequestError, UnauthorizedError, UnsupportedContentTypeError } from "./http-errors";

import _ from "lodash";
import { ensure } from "@utils/contracts";

function convertParamsToUrlParameters(params) {
    return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join("&");
}

function createRequestOptions({ method, body }) {
    // https://github.github.io/fetch/#options
    return {
        method: method,
        body: body
    };
}

export function get({ url, params }) {
    ensure(url, "url", "http.fetch-client.get").isNotNullOrEmpty();

    let requestUrl = url;

    if (!_.isNil(params)) {
        requestUrl = `${requestUrl}?${convertParamsToUrlParameters(params)}`;
    }

    const options = createRequestOptions({
        method: "GET"
    });

    return execute({
        url: requestUrl,
        options
    });
}

export function post({ url, params }) {
    ensure(url, "url", "http.fetch-client.post").isNotNullOrEmpty();

    const options = createRequestOptions({
        method: "POST",
        body: params
    });

    return execute({
        url,
        options
    });
}

async function execute(request) {
    const { url, options } = request;
    const response = await fetch(url, options);

    if (response.ok) {
        if (response.headers.get("content-type").includes("application/json")) {
            try {
                return await response.json();
            } catch (error) {
                throw new HttpRequestError(request, await buildResponseForError(response), error);
            }
        } else {
            throw new UnsupportedContentTypeError(request, await buildResponseForError(response));
        }
    } else if (response.status === 401) {
        throw new UnauthorizedError(request, await buildResponseForError(response));
    }

    throw new HttpRequestError(request, await buildResponseForError(response));
}

async function buildResponseForError(response) {
    const { url, status, statusText } = response;

    return {
        url,
        status,
        statusText,
        body: await response.text()
    };
}
