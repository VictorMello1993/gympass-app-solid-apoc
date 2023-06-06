import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(req: FastifyRequest, res: FastifyReply) {
  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: error.message });
    }

    throw error;
  }

  return res.status(200).send();
};
