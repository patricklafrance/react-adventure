import { productsHandlers } from "./products";
import { testsHandlers } from "./tests";

export const featuresHandlers = [...productsHandlers, ...testsHandlers];
