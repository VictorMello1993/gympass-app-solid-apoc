import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeValidateCheckInUseCase } from "@/useCase/factories/makeValidateCheckInUseCase";

export async function validate(req: FastifyRequest, res: FastifyReply) {
  const validateCheckInParamsScheam = z.object({
    checkInId: z.string().uuid()
  });

  const { checkInId } = validateCheckInParamsScheam.parse(req.params);

  const validateCheckInUseCase = makeValidateCheckInUseCase();

  await validateCheckInUseCase.execute({ checkInId });

  return res.status(204).send();
};
