import { expect, it, describe, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/InMemory/InMemoryCheckInsRepository";
import { ICheckInsRepository } from "../repositories/ICheckinsRepository";
import { CheckInUseCase } from "./checkin";

let checkInsRepository: ICheckInsRepository;
let sut: CheckInUseCase;

describe("Check in use case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it("It should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01"
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
