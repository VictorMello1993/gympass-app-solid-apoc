import { PrismaCheckInsRepository } from "@/repositories/prisma/PrismaCheckInsRepository";
import { PrismaGymsRepository } from "@/repositories/prisma/PrismaGymsRepository";
import { CheckInUseCase } from "../checkin";

export function makeCheckinUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const prismaGymsRepository = new PrismaGymsRepository();

  const checkInUseCase = new CheckInUseCase(prismaCheckInsRepository, prismaGymsRepository);

  return checkInUseCase;
}
