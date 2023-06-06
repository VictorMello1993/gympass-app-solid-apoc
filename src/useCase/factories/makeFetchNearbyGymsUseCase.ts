import { PrismaGymsRepository } from "@/repositories/prisma/PrismaGymsRepository";
import { FetchNearbyGymsUseCase } from "@/useCase/fetchNearbyGyms";

export function makeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(prismaGymsRepository);

  return fetchNearbyGymsUseCase;
}
