import { addHandlers } from "./add/handlers";
import { listingHandlers } from "./listing/handlers";

export const productsHandlers = [...listingHandlers, ...addHandlers];
