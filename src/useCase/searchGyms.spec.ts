import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../repositories/InMemory/InMemoryGymsRepository";
import { SearchGymsUseCase } from "./searchGyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search gyms use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("It should be able to search for gyms", async () => {
    await gymsRepository.create({
      name: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -23.0096896,
      longitude: -43.4798592
    });

    await gymsRepository.create({
      name: "IronJava",
      description: null,
      phone: null,
      latitude: -23.0096896,
      longitude: -43.4798592
    });

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 1
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ name: "Javascript Gym" })
    ]);
  });

  it("It should be able to fetch paginated gym search", async () => {
    // Cadastrando 22 academias
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `Javascript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.0096896,
        longitude: -43.4798592
      });
    }

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 2
    });

    /* Como o requisito é buscar 20 items por página e foram criadas 22 academias,
       então na segunda página só existem 2 academias restantes */
    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: "Javascript Gym 21" }),
      expect.objectContaining({ name: "Javascript Gym 22" })
    ]);
  });
});
