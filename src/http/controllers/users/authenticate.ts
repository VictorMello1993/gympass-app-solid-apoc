import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from "../../useCase/factories/makeAuthenticateUseCase";
import { InvalidCredentialsError } from "../../useCase/errors/InvalidCredentialsError";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });

  const { email, password } = authenticateSchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({ email, password });

    const token = await res.jwtSign({}, {
      sign: {
        sub: user.id
      }
    });

    return res.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: error.message });
    }

    throw error;
  }
};
