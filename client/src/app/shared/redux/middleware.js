import { ensure } from "@utils/contracts";

export function middleware(handler) {
    ensure(handler, "handler", "redux.middleware").isNotNull();

    return store => next => action => {
        handler(store, action);

        return next(action);
    };
}
