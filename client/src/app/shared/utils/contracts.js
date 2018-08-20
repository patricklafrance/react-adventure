import { ArgumentError, ArgumentNullError } from "@utils/errors";

import _ from "lodash";
import { isNullOrEmpty } from "@utils/types";
import { template } from "@utils/strings";

const ASSERTION_DEFINITIONS = {
    // usage:
    //      ensure(parameter, "Optional parameter name", "Optional context")
    //          .isNotNull("Optional specific message");
    isNotNull: (parameter, parameterName, context, assertionMessage) => {
        if (_.isNil(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} cannot be null.`, parameterName, context);
            throw new ArgumentNullError(parameterName, message);
        }
    },

    // usage:
    //      ensure(parameter, "Optional parameter name", "Optional context")
    //          .isNotEmpty("Optional specific message");
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
    },

    // usage:
    //      ensure(parameter, "Optional parameter name", "Optional context")
    //          .isNotNullOrEmpty("Optional specific message");
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
    },

    // usage:
    //      ensure(parameter, "Optional parameter name", "Optional context")
    //          .isFunction("Optional specific message");
    isFunction: (parameter, parameterName, context, assertionMessage) => {
        if (!_.isNil(parameter) && !_.isFunction(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be a function.`, parameterName, context);
            throw new ArgumentError(message);
        }
    },

    // usage:
    //      ensure(parameter, "Optional parameter name", "Optional context")
    //          .isString("Optional specific message");
    isString: (parameter, parameterName, context, assertionMessage) => {
        if (!_.isNil(parameter) && !_.isString(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be a string.`, parameterName, context);
            throw new ArgumentError(message);
        }
    },

    // usage:
    //      ensure(parameter, "Optional parameter name", "Optional context")
    //          .isArray("Optional specific message");
    isArray: (parameter, parameterName, context, assertionMessage) => {
        if (!_.isNil(parameter) && !_.isArray(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be an array.`, parameterName, context);
            throw new ArgumentError(message);
        }
    },

    // usage:
    //      ensure(parameter, "Optional parameter name", "Optional context")
    //          .isObject("Optional specific message");
    isObject: (parameter, parameterName, context, assertionMessage) => {
        if (!_.isNil(parameter) && !_.isObject(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be an object.`, parameterName, context);
            throw new ArgumentError(message);
        }
    },

    // usage:
    //      ensure(parameter, "Optional parameter name", "Optional context")
    //          .isNumber("Optional specific message");
    isNumber: (parameter, parameterName, context, assertionMessage) => {
        if (!_.isNil(parameter) && !_.isInteger(parameter)) {
            const message = getMessage(assertionMessage, template`${0}${1} must be a number.`, parameterName, context);
            throw new ArgumentError(message);
        }
    },

    // usage:
    //      ensure(parameter, "Optional parameter name", "Optional context")
    //          .isTrue(/* Can be a boolean or a function */ () => { return true; }, "Optional specific message");
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
//          .isNotEmpty("Optional specific message")
//          .isString("Optional specific message");
export function ensure(parameter, parameterName, context) {
    const assertions = {};

    const getAssertionProxy = assertion => {
        return (...args) => {
            // args.unshift(parameter, parameterName, context);

            // Reflect.apply(property, assertions, args);

            assertion(parameter, parameterName, context, ...args);

            return assertions;
        };
    };

    // Wrap all the assertions to append the default arguments to the function arguments.
    _.forOwn(ASSERTION_DEFINITIONS, (assertion, assertionKey) => {
        assertions[assertionKey] = getAssertionProxy(assertion);
    });

    return assertions;
}
