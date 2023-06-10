import { ValidateCheckInUseCase } from "@/useCase/validateCheckIn";
import { PrismaCheckInsRepository } from "@/repositories/prisma/PrismaCheckInsRepository";

export function makeValidateCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const validateCheckInUseCase = new ValidateCheckInUseCase(prismaCheckInsRepository);

  return validateCheckInUseCase;
}
