import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, IGymsRepository } from "../IGymsRepository";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "../../utils/getDistanceBetweenCoordinates";

export class InMemoryGymsRepository implements IGymsRepository {
  public gyms: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find(item => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date()
    };

    this.gyms.push(gym);

    return gym;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.gyms
      .filter(item => item.name.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[] | null> {
    return this.gyms.filter(gym => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
      );

      console.log(distance);

      return distance < 10;
    });
  }
}
