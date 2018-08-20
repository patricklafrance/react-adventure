import { layoutReducer } from "./layout";
import { productsReducer } from "./products";

export const featuresReducer = {
    ...productsReducer,
    ...layoutReducer
};
