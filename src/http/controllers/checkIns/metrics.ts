import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserMetricsUseCase } from "../../../useCase/factories/makeGetUserMetricsUseCase";

export async function metrics(req: FastifyRequest, res: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase();

  const { checkInsCount } = await getUserMetricsUseCase.execute({ userId: req.user.sub });

  return res.status(200).send({ checkInsCount });
};
