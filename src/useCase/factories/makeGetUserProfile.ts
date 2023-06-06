import { PrismaUsersRepository } from "@/repositories/prisma/PrismaUsersRepository";
import { GetUserProfileUseCase } from "@/useCase/getUserProfile";

export function makeGetUserProfile() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getUseProfileUseCase = new GetUserProfileUseCase(prismaUsersRepository);

  return getUseProfileUseCase;
}
