import _ from "lodash";

export function isNullOrEmpty(value) {
    return _.isNil(value) || value === "";
}

export function isNotNullOrEmpty(value) {
    return !isNullOrEmpty(value);
}
