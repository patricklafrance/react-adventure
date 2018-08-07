import { COUNTER_ACTIONS } from "@actions";

const INITIAL_STATE = {
    count: 0
};

function reset() {
    return INITIAL_STATE;
}

function increment(state) {
    return {
        count: state.count + 1
    };
}

function reducer(state = INITIAL_STATE, { type, payload }) {
    switch (type) {
        case COUNTER_ACTIONS.reset:
            return reset();
        case COUNTER_ACTIONS.increment:
            return increment(state);
        default:
            return state;
    }
}

export const counterReducer = {
    counter: reducer
};
