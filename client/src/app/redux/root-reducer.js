import { combineReducers } from "redux";
import { featuresReducer } from "@features/reducers";

// import { listingReducers } from "../features/products/listing/reducers";

// const test1 = {
//     products: combineReducers({
//         ...listingReducers
//     })
// };

// export function rootReducer(state = [], action) {
//     return state;
// }

export const rootReducer = combineReducers({
    ...featuresReducer
});
