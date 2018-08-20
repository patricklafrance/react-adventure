import { apiMiddlewares } from "@http/api";
import { handlers } from "./handlers";

export const middlewares = [...apiMiddlewares, ...handlers];
