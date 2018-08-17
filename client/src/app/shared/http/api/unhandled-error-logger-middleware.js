import { API_UNHANDLED_ERROR } from "@events";
import { IS_DEBUG } from "@utils/env";
import _ from "lodash";

export const unhandledErrorLoggerMiddleware = ({ dispatch }) => next => async action => {
    const { type, payload } = action;

    if (type === API_UNHANDLED_ERROR) {
        if (IS_DEBUG) {
            const { code, message, request, response } = payload;

            let output = `An unhandled error occurred.\nCode: ${code}\nMessage: ${message}\nRequest: ${JSON.stringify(request, 4)}`;

            if (!_.isNil(response)) {
                const responseContent = await response.getContent();
                output += `\nResponse: ${JSON.stringify(response, 4)}\nContent: ${responseContent}`;
            }

            console.error(output);
        }
    }

    return next(action);
};
