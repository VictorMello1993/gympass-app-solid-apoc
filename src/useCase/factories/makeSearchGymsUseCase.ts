import { PrismaGymsRepository } from "@/repositories/prisma/PrismaGymsRepository";
import { SearchGymsUseCase } from "@/useCase/searchGyms";

export function makeSearchGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const searchGymsUseCase = new SearchGymsUseCase(prismaGymsRepository);

  return searchGymsUseCase;
}
