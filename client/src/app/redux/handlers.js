import { featuresHandlers } from "@features/handlers";
import { handler } from "@redux";

export const handlers = [...featuresHandlers].map(x => handler(x));
