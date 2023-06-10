import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateGymUseCase } from "@/useCase/factories/makeCreateGymUseCase";

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createGymBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180;
    })
  });

  const { name, description, phone, latitude, longitude } = createGymBodySchema.parse(req.body);

  const createGymUseCase = makeCreateGymUseCase();

  await createGymUseCase.execute({ name, description, phone, latitude, longitude });

  return res.status(201).send();
};
