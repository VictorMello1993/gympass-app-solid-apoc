import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../repositories/InMemory/InMemoryGymsRepository";
import { CreateGymUseCase } from "./createGym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create gym use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("It should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      name: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -23.0096896,
      longitude: -43.4798592
    });

    expect(gym?.id).toEqual(expect.any(String));
  });
});
