import { badRequest, malformedJson, networkError, requestError, unauthorized, unsupportedContentType } from "./http-errors";

import _ from "lodash";
import { ensure } from "@utils/contracts";
import { isNotNullOrEmpty } from "@utils/types";

// TODO: Use the new URLSearchParams
// TODO: Might not need if we choose to use routes like /products/:productId
function convertDataToUrlParameters(params) {
    return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join("&");
}

// TODO: Will need to include credentials: { credentials: 'include' }
function createRequestOptions({ method, body }) {
    // https://github.github.io/fetch/#options
    return {
        method: method,
        body: body,
        headers: {
            "Content-Type": "application/json"
        }
    };
}

export function get({ url, data }) {
    ensure(url, "url", "http.fetch-client.get").isNotNullOrEmpty();

    let requestUrl = url;

    if (!_.isNil(data)) {
        const urlParameters = convertDataToUrlParameters(data);

        if (isNotNullOrEmpty(urlParameters)) {
            requestUrl = `${requestUrl}?${urlParameters}`;
        }
    }

    const options = createRequestOptions({
        method: "GET"
    });

    return execute({
        url: requestUrl,
        options
    });
}

export function post({ url, data }) {
    ensure(url, "url", "http.fetch-client.post").isNotNullOrEmpty();

    const options = createRequestOptions({
        method: "POST",
        body: JSON.stringify(data)
    });

    return execute({
        url,
        options
    });
}

async function execute(request) {
    const ok = content => ({ ok: true, content, error: null });
    const fail = error => ({ ok: false, content: null, error });

    try {
        const { url, options } = request;
        const response = await fetch(url, options);

        if (response.ok) {
            const { hasContent, content, contentType, isJson } = await getRawContent(response);

            // Doesn't need to be async since the await operator will convert it to a resolved promise if needed,
            const textAccessor = () => content;

            if (hasContent && content !== "OK") {
                if (isJson) {
                    const jsonResult = toJson(content);

                    if (jsonResult.isMalformed) {
                        return fail(malformedJson(request, response, jsonResult.error, textAccessor));
                    }

                    return ok(jsonResult.json);
                } else {
                    return fail(unsupportedContentType(request, response, contentType, textAccessor));
                }
            }

            return ok();
        } else if (response.status === 400) {
            const { hasContent, content, isJson } = await getRawContent(response);

            // Doesn't need to be async since the await operator will convert it to a resolved promise if needed,
            const textAccessor = () => content;

            if (hasContent && isJson) {
                const jsonResult = toJson(content);

                if (jsonResult.isMalformed) {
                    return fail(malformedJson(request, response, jsonResult.error, textAccessor));
                }

                return fail(badRequest(request, response, jsonResult.son, textAccessor));
            }

            return fail(badRequest(request, response, null, textAccessor));
        } else if (response.status === 401) {
            return fail(unauthorized(request, response));
        }

        // The status code is not currently handled.
        return fail(requestError(request, response));
    } catch (error) {
        return fail(networkError(request, error));
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
