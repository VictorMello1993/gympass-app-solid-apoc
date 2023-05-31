import { expect, it, describe, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/InMemory/InMemoryCheckInsRepository";
import { GetUserMetricsUseCase } from "./getUserMetrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get user metrics use case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("It should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01"
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01"
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01"
    });

    expect(checkInsCount).toEqual(2);
  });
});
