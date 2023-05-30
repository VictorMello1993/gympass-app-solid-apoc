import { Gym, Prisma } from "@prisma/client";
import { IGymsRepository } from "../IGymsRepository";
import { randomUUID } from "node:crypto";

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
}
