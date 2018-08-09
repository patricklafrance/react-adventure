import { SET_PRODUCTS } from "./actions";

// TODO: Pas certains que ça fonctionne ça avec plusieurs fichiers de reducers?
const INITIAL_STATE = {
    products: []
};

// TODO: Pas certains que ça fonctionne ça avec plusieurs fichiers de reducers?
// Doit probablement
// return {
//    ...state,
//    products: payload
// }
function setProducts(state, payload) {
    return {
        ...state,
        products: payload
    };
}

function reducer(state = INITIAL_STATE, { type, payload }) {
    switch (type) {
        case SET_PRODUCTS:
            return setProducts(state, payload);
        default:
            return state;
    }
}

export const listingReducer = {
    listing: reducer
};
