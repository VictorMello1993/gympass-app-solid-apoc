import { PrismaCheckInsRepository } from "../../repositories/prisma/PrismaCheckInsRepository";
import { FetchUserCheckInsHistoryUseCase } from "../fetchUserCheckInsHistory";

export function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const makeFetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(prismaCheckInsRepository);

  return makeFetchUserCheckInsHistoryUseCase;
}
