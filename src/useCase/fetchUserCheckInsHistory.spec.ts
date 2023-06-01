import { expect, it, describe, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/InMemory/InMemoryCheckInsRepository";
import { FetchUserCheckInsHistoryUseCase } from "./fetchUserCheckInsHistory";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Fetch user check-in history use case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
  });

  it("It should be able to fetch check-in user history", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01"
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01"
    });

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 1
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" })
    ]);
  });

  it("It should be able to fetch paginated user check-in history", async () => {
    // Registrando 22 check-ins de academia por usuário logado
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01"
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2
    });

    /* Como o requisito é buscar 20 items por página e foram realizados 22 check-ins de academia,
       então na segunda página só existem 2 check-ins restantes */
    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" })
    ]);
  });
});
