import { CreateGymUseCase } from "@/useCase/createGym";
import { PrismaGymsRepository } from "@/repositories/prisma/PrismaGymsRepository";

export function makeCreateGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const createGymUseCase = new CreateGymUseCase(prismaGymsRepository);

  return createGymUseCase;
}
