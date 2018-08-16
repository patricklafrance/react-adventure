export const REQUEST_ERROR = "Request Error";
export const NETWORK_ERROR = "Network Error";
export const BAD_REQUEST_ERROR = "Bad Request";
export const UNAUTHORIZED_ERROR = "Unauthorized";
export const UNSUPPORTED_CONTENT_TYPE_ERROR = "Unsupported Content Type";
export const MALFORMED_JSON_ERROR = "Malformed JSON";

function toErrorResponse(response, contentAccessor) {
    const { url, status, statusText } = response;

    return {
        url,
        status,
        statusText,
        // This is quite complex because a fetch response stream cannot be read twice.
        getContent: contentAccessor || (() => response.text())
    };
}

export function requestError(request, response) {
    return {
        code: REQUEST_ERROR,
        message: "An error occurred while sending the request",
        request,
        response: toErrorResponse(response)
    };
}

export function networkError(request, innerError) {
    return {
        code: NETWORK_ERROR,
        message: `Couldn't reach the server\nError: ${innerError.toString()}`,
        request
    };
}

export function badRequest(request, response, responseData, responseTextAccessor) {
    return {
        code: BAD_REQUEST_ERROR,
        message: "Server responded with a 400 Bad Request",
        data: responseData,
        request,
        response: toErrorResponse(response, responseTextAccessor)
    };
}

export function unsupportedContentType(request, response, contentType) {
    return {
        code: UNSUPPORTED_CONTENT_TYPE_ERROR,
        message: `\nServer response Content-Type: "${contentType}" is not supported`,
        request,
        response: toErrorResponse(response)
    };
}

export function unauthorized(request, response) {
    return {
        code: UNAUTHORIZED_ERROR,
        message: "Server responded with a 401 Unauthorized Request",
        request,
        response: toErrorResponse(response)
    };
}

export function malformedJson(request, response, innerError) {
    return {
        code: MALFORMED_JSON_ERROR,
        message: `Server responsed with a malformed JSON body\nError: ${innerError.toString()}`,
        request,
        response: toErrorResponse(response)
    };
}
