import { badRequest, malformedJson, networkError, requestError, unauthorized, unsupportedContentType } from "./http-errors";

import _ from "lodash";
import { ensure } from "@utils/contracts";
import { isNotNullOrEmpty } from "@utils/types";

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
    const ok = content => ({ ok: true, content, error: null });
    const error = error => ({ ok: false, content: null, error });

    const readResponse = async ({ request, response, withContent, withoutContent }) => {
        const { hasContent, content, contentType, isJson } = await getRawContent(response);

        // Doesn't need to be async since the await operator will convert it to a resolved promise if needed,
        const textAccessor = () => content;

        if (hasContent && content !== "OK") {
            if (isJson) {
                const jsonResult = toJson(content);

                if (jsonResult.isMalformed) {
                    return error(malformedJson(request, response, jsonResult.error, textAccessor));
                }

                return withContent({ request, response, jsonResult, textAccessor });
            } else {
                return error(unsupportedContentType(request, response, contentType, textAccessor));
            }
        }

        return withoutContent({ request, response, textAccessor });
    };

    try {
        const { url, options } = request;
        const response = await fetch(url, options);

        if (response.ok) {
            return readResponse({
                response,
                withContent: ({ jsonResult }) => ok(jsonResult.json),
                withoutContent: () => ok()
            });
        } else if (response.status === 400) {
            return readResponse({
                response,
                withContent: ({ jsonResult, textAccessor }) => error(badRequest(request, response, jsonResult.son, textAccessor)),
                withoutContent: ({ textAccessor }) => error(badRequest(request, response, null, textAccessor))
            });
        } else if (response.status === 401) {
            return error(unauthorized(request, response));
        }

        // The status code is not currently handled.
        return error(requestError(request, response));
    } catch (error) {
        return error(networkError(request, error));
    }
}

async function getRawContent(response) {
    const contentType = response.headers.get("content-type");
    const text = await response.text();

    return {
        hasContent: isNotNullOrEmpty(text),
        content: text,
        contentType,
        isJson: contentType.includes("application/json")
    };
}

function toJson(content) {
    const result = ({ isMalformed, json = null, error = null }) => ({ isMalformed, json, error });

    try {
        return result({ isMalformed: false, json: JSON.parse(content) });
    } catch (error) {
        return result({ isMalformed: true, error });
    }
}
