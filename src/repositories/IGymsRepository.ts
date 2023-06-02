import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface IGymsRepository{
  findById(id: string): Promise<Gym | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[] | null>
  create(data: Prisma.GymCreateInput): Promise<Gym | null>
  searchMany(query: string, page: number) : Promise<Gym[]>
}
