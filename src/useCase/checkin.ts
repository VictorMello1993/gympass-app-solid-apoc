import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../repositories/ICheckInsRepository";
import { IGymsRepository } from "../repositories/IGymsRepository";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";

interface CheckInUseCaseRequest{
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse{
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository
  ) {}

  async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    // Calcular a distância entre o usuário e a academia
    // Se a distância for maior que 100m, disparar o erro

    const checkInOnTheSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());

    if (checkInOnTheSameDay) {
      throw new Error();
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    });

    return {
      checkIn
    };
  }
}
