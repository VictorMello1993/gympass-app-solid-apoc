import { PrismaCheckInsRepository } from "@/repositories/prisma/PrismaCheckInsRepository";
import { GetUserMetricsUseCase } from "@/useCase/getUserMetrics";

export function makeGetUserMetricsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const getUserMetricsUseCase = new GetUserMetricsUseCase(prismaCheckInsRepository);

  return getUserMetricsUseCase;
}
