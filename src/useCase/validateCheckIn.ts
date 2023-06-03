import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../repositories/ICheckInsRepository";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/LateCheckInValidationError";

interface ValidateCheckInUseCaseRequest{
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse{
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository
  ) {}

  async execute({ checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    console.log(distanceInMinutesFromCheckInCreation);

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.update(checkIn);

    return {
      checkIn
    };
  }
}
