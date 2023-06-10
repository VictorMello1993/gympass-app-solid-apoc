import { FastifyInstance } from "fastify";
import { jwtVerify } from "@/http/middlewares/jwtVerify";
import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", jwtVerify);

  app.post("gyms", create);
  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);
}
