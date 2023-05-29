import { Gym } from "@prisma/client";
import { IGymsRepository } from "../IGymsRepository";

export class InMemoryGymsRepository implements IGymsRepository {
  public gyms: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find(item => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
