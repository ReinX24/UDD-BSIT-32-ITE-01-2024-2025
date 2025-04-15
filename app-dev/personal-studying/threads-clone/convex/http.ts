import { httpAction } from "./_generated/server";
import { httpRouter } from "convex/server";

const http = httpRouter();

export const doSomething = httpAction(async () => {
  console.log("doSomething");

  return new Response();
});

export default http;