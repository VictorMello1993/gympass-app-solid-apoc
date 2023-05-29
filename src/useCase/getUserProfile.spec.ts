import { expect, it, describe, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/InMemory/InMemoryUsersRepository";
import { GetUserProfileUseCase } from "./getUserProfile";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get user profile use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(inMemoryUsersRepository);
  });

  it("It should be able to get user profile", async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: "fulano",
      email: "fulano1@teste.com.br",
      password_hash: await hash("123456", 6)
    });

    const { user } = await sut.execute({
      userId: createdUser.id
    });

    expect(user.name).toEqual("fulano");
  });

  it("It should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id"
      })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
