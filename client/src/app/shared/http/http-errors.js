import _ from "lodash";

export class HttpError extends Error {
    constructor(message, request, response) {
        super(message, request, response);
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
        const message = `\nHTTP response Content-Type is not supported:\nRequest: ${JSON.stringify(request)}\nResponse: ${JSON.stringify(response)}`;
        super(message, request, response);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(request, response) {
        const message = `\nUnauthorized request:\nRequest: ${JSON.stringify(request)}\nResponse: ${JSON.stringify(response)}`;
        super(message, request, response);
    }
}
