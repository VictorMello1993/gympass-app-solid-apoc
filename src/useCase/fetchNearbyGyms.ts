import { IGymsRepository } from "../repositories/IGymsRepository";

interface FetchNearbyGymsUseCaseRequest{
  userLatitude: number;
  userLongitude: number;
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) { }

  async execute({ userLatitude, userLongitude }: FetchNearbyGymsUseCaseRequest) {
    const gyms = await this.gymsRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude });

    return { gyms };
  }
}
