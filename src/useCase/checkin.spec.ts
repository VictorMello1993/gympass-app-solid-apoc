import { expect, it, describe, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/InMemory/InMemoryCheckInsRepository";
import { CheckInUseCase } from "./checkin";
import { InMemoryGymsRepository } from "../repositories/InMemory/InMemoryGymsRepository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "./errors/MaxNumberOfCheckInsError";
import { MaxDistanceError } from "./errors/MaxDistanceError";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check in use case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      name: "Javascript Gym",
      description: "",
      phone: "",
      latitude: -23.016849,
      longitude: -43.4718939
    });

    vi.useFakeTimers(); // Antes de executar cada teste, os valores da data serão fictícias
  });

  afterEach(() => {
    vi.useRealTimers(); // Depois de ter rodado cada teste, os valores da data passam ser reais
  });

  it("It should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.016849,
      userLongitude: -43.4718939
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("It should not be able to check in twice in the same day", async () => {
    /* Setando a data fixa do sistema com valor fictício para garantir que a regra
       de negócio em questão seja validada com garantia de que a data atual do sistema
       seja fixa, devido à chamada do método useFakeTimers() dentro de beforeEach() */
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0)); // 01/01/2023 08:00 (11:00 UTC)

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.016849,
      userLongitude: -43.4718939
    });

    await expect(() => sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.016849,
      userLongitude: -43.4718939
    })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("It should be able to check in twice, but in the different days", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0)); // 01/01/2023 08:00 (11:00 UTC)

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.016849,
      userLongitude: -43.4718939
    });

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0)); // 21/01/2023 08:00 (11:00 UTC)

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -23.016849,
      userLongitude: -43.4718939
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("It should not be able to check in on distant gym", async () => {
    gymsRepository.gyms.push({
      id: "gym-02",
      name: "Javascript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-23.008188),
      longitude: new Decimal(-43.4628544)
    });

    await expect(() => sut.execute({
      gymId: "gym-02",
      userId: "user-01",
      userLatitude: -23.016849,
      userLongitude: -43.4718939
    })).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
