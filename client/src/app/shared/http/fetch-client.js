import { badRequest, malformedJson, networkError, requestError, unauthorized, unsupportedContentType } from "./http-errors";

import _ from "lodash";
import { ensure } from "@utils/contracts";
import { isNullOrEmpty } from "@utils/types";

// TODO: Use the new URLSearchParams
function convertParamsToUrlParameters(params) {
    return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join("&");
}

// TODO: Will need to include credentials: { credentials: 'include' }
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
        body: params,
        headers: {
            "Content-Type": "application/json"
        }
    });

    return execute({
        url,
        options
    });
}

async function execute(request) {
    const ok = (content = {}) => ({ ok: true, content, error: null });
    const error = error => ({ ok: false, content: null, error });

    const { url, options } = request;

    try {
        const response = await fetch(url, options);
        const { contentType, isJson } = getContentType(response);

        if (response.ok) {
            if (isJson) {
                const content = await getJsonContent(response);

                if (content.isMalformed) {
                    return error(malformedJson(request, response, content.error));
                }

                return ok(content.json);
            } else {
                return error(unsupportedContentType(request, response, contentType));
            }
        } else {
            if (response.status === 400) {
                let data = null;
                let textAccessor = null;

                if (isJson) {
                    const content = await getJsonContent(response);

                    if (content.isMalformed) {
                        return error(malformedJson(request, response, content.error));
                    }

                    data = content.json;
                    // Doesn't need to be async since the await operator will convert it to a resolved promise if needed,
                    textAccessor = () => content.text;
                }

                return error(badRequest(request, response, data, textAccessor));
            } else if (response.status === 401) {
                return error(unauthorized(request, response));
            }

            // The status code is not currently handled.
            return error(requestError(request, response));
        }
    } catch (error) {
        return error(networkError(request, error));
    }
}

function getContentType(response) {
    const contentType = response.headers.get("content-type");

    return {
        contentType,
        isJson: contentType.includes("application/json")
    };
}

async function getJsonContent(response) {
    const ok = (text = "", json = {}) => ({ isMalformed: false, text, json, error: null });
    const malformed = (text = "", error) => ({ isMalformed: true, text, json: null, error });

    const text = await response.text();

    if (isNullOrEmpty(text)) {
        return ok();
    }

    try {
        return ok(text, JSON.parse(text));
    } catch (error) {
        return malformed(text, error);
    }
}
