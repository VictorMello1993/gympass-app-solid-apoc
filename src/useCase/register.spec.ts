import { expect, it, describe, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/InMemory/InMemoryUsersRepository";
import { UserAlreadyExistsError } from "./errors/UserAlreadyExistsError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(inMemoryUsersRepository);
  });

  it("It should be able to register", async () => {
    const { user } = await sut.execute({
      name: "fulano",
      email: "fulano1@teste.com.br",
      password: "123456"
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("It should be able to generate hash user password correctely", async () => {
    const { user } = await sut.execute({
      name: "Victor",
      email: "victor1@teste.com.br",
      password: "123456"
    });

    const isPasswordCorrectlyHashed = await compare("123456", user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it.skip("It should not be able to register with the same e-mail twice", async () => {
    const email = "user1@teste.com.br";

    await sut.execute({
      name: "Victor",
      email,
      password: "123456"
    });

    await expect(() => sut.execute({
      name: "Victor",
      email,
      password: "123456"
    })).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
