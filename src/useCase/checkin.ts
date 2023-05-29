import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../repositories/ICheckInsRepository";

interface CheckInUseCaseRequest{
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse{
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository
  ) {}

  async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
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
