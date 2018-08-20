import { layoutHandlers } from "./layout";
import { playgroundHandlers } from "./playground";
import { productsHandlers } from "./products";

export const featuresHandlers = [...productsHandlers, ...playgroundHandlers, ...layoutHandlers];
