import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../repositories/InMemory/InMemoryGymsRepository";
import { FetchNearbyGymsUseCase } from "./fetchNearbyGyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch gyms nearby use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("It should be able to fetch gyms nearby", async () => {
    await gymsRepository.create({
      name: "Near Gym",
      description: null,
      phone: null,
      latitude: -23.0096896,
      longitude: -43.4798592
    });

    await gymsRepository.create({
      name: "Far gym",
      description: null,
      phone: null,
      latitude: -22.9597295,
      longitude: -43.6398476
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.0096896,
      userLongitude: -43.4798592
    });

    // Aqui vai retornar a academia "Near Gym" pois está exatamente na mesma coordenada onde o usuário se localiza
    // Logo, a distância é zero, o que indica que está dentro do raio de 10km
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ name: "Near Gym" })
    ]);
  });
});
