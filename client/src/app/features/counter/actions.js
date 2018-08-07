const NAMESPACE = "[counter]";

export const COUNTER_ACTIONS = {
    reset: `${NAMESPACE} Reset`,
    increment: `${NAMESPACE} Increment`
};

export function reset() {
    return {
        type: COUNTER_ACTIONS.reset,
        payload: {}
    };
}

export function increment() {
    return {
        type: COUNTER_ACTIONS.increment,
        payload: {}
    };
}
