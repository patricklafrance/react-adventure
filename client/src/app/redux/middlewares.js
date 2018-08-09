import { apiRequestMiddlewares } from "@http/api";
import { handlers } from "./handlers";

export const middlewares = [...handlers, ...apiRequestMiddlewares];
