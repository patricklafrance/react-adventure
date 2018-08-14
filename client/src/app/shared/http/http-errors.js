import _ from "lodash";

const REQUEST_TOKEN = "[REQUEST]";
const RESPONSE_TOKEN = "[RESPONSE]";

function buildErrorMessage(template, request, response) {
    return template.replace(REQUEST_TOKEN, getRequestString(request)).replace(RESPONSE_TOKEN, getResponseString(response));
}

function getRequestString(request) {
    return JSON.stringify(request);
}

function getResponseString(response) {
    const { url, status, statusText, type } = response;

    return `{ url: ${url}, status: ${status}, statusText: ${statusText}, type: ${type} }`;
}

export class HttpError extends Error {
    constructor(messageTemplate, request, response) {
        super(buildErrorMessage(messageTemplate, request, response));
        this.request = request;
        this.response = response;
    }
}

export class RequestError extends HttpError {
    constructor(request, response, innerError) {
        let message = `\nAn HTTP error occured:\nRequest: ${JSON.stringify(request)}\nResponse: ${JSON.stringify(response)}`;

        if (!_.isNil(innerError)) {
            message += `Error: ${innerError.toString()}`;
        }

        super(message, request, response);
        this.innerError = innerError;
    }
}

export class UnsupportedContentTypeError extends HttpError {
    constructor(request, response) {
        const message = `\nHTTP response Content-Type is not supported:\nRequest: ${REQUEST_TOKEN}\nResponse: ${RESPONSE_TOKEN}`;

        super(message, request, response);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(request, response) {
        const message = `\nUnauthorized request:\nRequest: ${REQUEST_TOKEN}\nResponse: ${RESPONSE_TOKEN}`;

        super(message, request, response);
    }
}
