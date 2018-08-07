import { isNull, isNullOrEmpty } from "@utils/types";

import { ArgumentNullError } from "@utils/errors";
import _ from "lodash";
import { template } from "@utils/strings";

const ASSERTION_DEFINITIONS = {
    isNotNull: (parameter, parameterName, context, assertionMessage) => {
        if (_.isNil(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} cannot be null.`, parameterName, context);
            throw new ArgumentNullError(parameterName, message);
        }

        return this;
    },

    isNotEmpty: (parameter, parameterName, context, assertionMessage) => {
        let isValid = false;

        if (!_.isNil(parameter)) {
            isValid = true;
        } else if (_.isArray(parameter)) {
            isValid = parameter.length > 0;
        } else {
            isValid = parameter !== "";
        }

        if (!isValid) {
            const message = getMessage(assertionMessage, template`${0}${1} cannot be empty.`, parameterName, context);
            throw new ArgumentError(message);
        }

        return this;
    },

    isNotNullOrEmpty: (parameter, parameterName, context, assertionMessage) => {
        let message = "";

        if (_.isNil(parameter)) {
            message = getMessage(assertionMessage, template`${0}${1} cannot be null.`, parameterName, context);
            throw new ArgumentNullError(parameterName, message);
        }

        if (parameter === "") {
            message = getMessage(assertionMessage, template`${0}${1} cannot be empty.`, parameterName, context);
            throw new ArgumentError(message);
        }

        return this;
    },

    isFunction: (parameter, parameterName, context, assertionMessage) => {
        if (!_.isNil(parameter) && !_.isFunction(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be a function.`, parameterName, context);
            throw new ArgumentError(message);
        }

        return this;
    },

    isString: (parameter, parameterName, context, assertionMessage) => {
        if (!_.isNil(parameter) && !_.isString(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be a string.`, parameterName, context);
            throw new ArgumentError(message);
        }

        return this;
    },

    isArray: (parameter, parameterName, context, assertionMessage) => {
        if (!_.isNil(parameter) && !_.isArray(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be an array.`, parameterName, context);
            throw new ArgumentError(message);
        }

        return this;
    },

    isObject: (parameter, parameterName, context, assertionMessage) => {
        if (!_.isNil(parameter) && !_.isObject(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be an object.`, parameterName, context);
            throw new ArgumentError(message);
        }

        return this;
    },

    isNumber: (parameter, parameterName, context, assertionMessage) => {
        if (!_.isNil(parameter) && !_.isInteger(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be a number.`, parameterName, context);
            throw new ArgumentError(message);
        }

        return this;
    },

    isTrue: (parameter, parameterName, context, evaluator, assertionMessage) => {
        let fct = evaluator;

        if (!_.isFunction(evaluator)) {
            fct = x => {
                return !!x;
            };
        }

        if (!_.isNil(parameter) && !fct(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} is invalid.`, parameterName, context);
            throw new ArgumentError(message);
        }

        return this;
    }
};

function getMessage(assertionMessage, defaultMessageTemplate, parameterName, context) {
    let message = assertionMessage;

    if (isNullOrEmpty(message)) {
        const param1 = isNullOrEmpty(context) ? "" : `${context} - `;
        const param2 = isNullOrEmpty(parameterName) ? "Parameter" : parameterName;

        message = defaultMessageTemplate(param1, param2);
    }

    return message;
}

// summary:
//         Ensure that a @parameter respect the specified assertions.
// description:
//         Ensure that a @parameter respect the specified assertions. Every assertions returns
//         an object literal that contains all the assertions to allow chaining.
// parameter: Object
//         The parameter to verify.
// parameterName: String
//         An optional name of the parameter to verify.
// context: String
//         An optional identifier providing more information about the context of the call to ensure.
// returns:
//         An object that contains all the assertions functions.
// usage:
//      ensure(parameter, "Optional parameter name", "Optional context")
//          .isNotNull("Optional specific message")
//          .isNotEmpty();
export function ensure(parameter, parameterName, context) {
    const assertions = {};

    const getAssertionProxy = property => {
        return (...args) => {
            args.unshift(parameter, parameterName, context);

            return Reflect.apply(property, assertions, args);
        };
    };

    // Wrap all the assertions to append the default arguments to the function arguments.
    _.forOwn(ASSERTION_DEFINITIONS, (assertion, assertionKey) => {
        assertions[assertionKey] = getAssertionProxy(assertion);
    });

    return assertions;
}
