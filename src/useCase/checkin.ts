import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../repositories/ICheckInsRepository";
import { IGymsRepository } from "../repositories/IGymsRepository";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { getDistanceBetweenCoordinates } from "../utils/getDistanceBetweenCoordinates";
import { MaxNumberOfCheckInsError } from "./errors/MaxNumberOfCheckInsError";
import { MaxDistanceError } from "./errors/MaxDistanceError";

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

  async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    const MAX_DISTANCE_IN_KM = 0.1;

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError();
    }

    const checkInOnTheSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());

    if (checkInOnTheSameDay) {
      throw new MaxNumberOfCheckInsError();
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
