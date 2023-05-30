import { IGymsRepository } from "../repositories/IGymsRepository";

interface CreateGymUseCaseRequest{
  name: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: IGymsRepository) { }

  async execute({ name, description, phone, latitude, longitude }: CreateGymUseCaseRequest) {
    const gym = await this.gymsRepository.create({ name, description, phone, latitude, longitude });

    return { gym };
  }
}
