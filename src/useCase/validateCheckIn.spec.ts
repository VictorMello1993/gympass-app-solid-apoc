import { expect, it, describe, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/InMemory/InMemoryCheckInsRepository";
import { ValidateCheckInUseCase } from "./validateCheckIn";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { LateCheckInValidationError } from "./errors/LateCheckInValidationError";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate check-in use case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers(); // Antes de executar cada teste, os valores da data serão fictícias
  });

  afterEach(() => {
    vi.useRealTimers(); // Depois de ter rodado cada teste, os valores da data passam ser reais
  });

  it("It should be able to validate check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01"
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.checkIns[0].validated_at).toEqual(expect.any(Date));
  });

  it("It should not be able to validate an inexistent check-in", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01"
    });

    await expect(() => sut.execute({
      checkInId: "inexistent-id"
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("It should not be able to validate check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40)); // 01/01/2023 13:40 - 16:40 em UTC

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01"
    });

    const TwentyOneMinutesInMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(TwentyOneMinutesInMs); // 01/01/2023 14:01 - 17:01 em UTC

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id
      })
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
