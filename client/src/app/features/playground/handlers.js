import { HANDLE_BAD_REQUEST } from "./actions";

const handleBadRequest = (dispatch, { type, payload }) => {
    if (type === HANDLE_BAD_REQUEST) {
        console.log(`Handled bad request!\nData is: ${JSON.stringify(payload)}`);
    }
};

export const playgroundHandlers = [handleBadRequest];
