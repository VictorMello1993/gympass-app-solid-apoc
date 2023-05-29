import { expect, it, describe, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/InMemory/InMemoryUsersRepository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/InvalidCredentialsError";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("It should be able to authenticate", async () => {
    await usersRepository.create({
      name: "User 1",
      email: "user1@teste.com.br",
      password_hash: await hash("123456", 6)
    });

    const { user } = await sut.execute({
      email: "user1@teste.com.br",
      password: "123456"
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("It should be not be able to authenticate with wrong email", async () => {
    await usersRepository.create({
      name: "User 1",
      email: "user1@teste.com.br",
      password_hash: await hash("123456", 6)
    });

    await expect(() => sut.execute({
      email: "user123@teste.com.br",
      password: "123456"
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("It should be not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "User 1",
      email: "user1@teste.com.br",
      password_hash: await hash("123456", 6)
    });

    await expect(() => sut.execute({
      email: "user123@teste.com.br",
      password: "12365454"
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
