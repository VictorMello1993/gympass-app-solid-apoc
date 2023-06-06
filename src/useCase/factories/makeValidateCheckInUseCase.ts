import { ValidateCheckInUseCase } from "@/useCase/validateCheckIn";
import { PrismaCheckInsRepository } from "@/repositories/prisma/PrismaCheckInsRepository";

export function makeSearchGymsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const validateCheckInUseCase = new ValidateCheckInUseCase(prismaCheckInsRepository);

  return validateCheckInUseCase;
}
