import _ from "lodash";
import { ensure } from "@utils/contracts";

export function createReducer(initialState, reducers, context = "reducer") {
    ensure(initialState, "initialState", "utils.redux.createReducer").isNotNull();
    ensure(reducers, "reducers", "utils.redux.createReducer").isNotNull();

    return (state = initialState, { type, payload } = {}) => {
        var reducer = reducers[type];

        if (_.isNil(reducer)) {
            return state;
        }

        return reducer(state, payload);
    };
}
