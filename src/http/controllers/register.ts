import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "../../useCase/register";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { UserAlreadyExistsError } from "../../useCase/errors/UserAlreadyExists";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  });

  const { name, email, password } = createUserSchema.parse(req.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    await registerUseCase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send(error.message);
    }
  }

  return res.status(500).send();
};
