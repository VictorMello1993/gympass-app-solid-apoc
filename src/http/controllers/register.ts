import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/useCase/errors/UserAlreadyExistsError";
import { makeRegisterUseCase } from "@/useCase/factories/makeRegisterUseCase";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  });

  const { name, email, password } = createUserSchema.parse(req.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({ name, email, password });

    return res.status(201).send();
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: error.message });
    }

    throw error;
  }
};
