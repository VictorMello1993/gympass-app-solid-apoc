import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCheckinUseCase } from "@/useCase/factories/makeCheckinUseCase";

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  });

  const createCheckinBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180;
    })
  });

  const { gymId } = createCheckInParamsSchema.parse(req.params);
  const { latitude, longitude } = createCheckinBodySchema.parse(req.body);

  const createCheckInUseCase = makeCheckinUseCase();

  await createCheckInUseCase.execute(
    {
      userId: req.user.sub,
      gymId,
      userLatitude: latitude,
      userLongitude: longitude
    });

  return res.status(201).send();
};
