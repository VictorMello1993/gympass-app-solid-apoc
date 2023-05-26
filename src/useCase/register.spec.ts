import { expect, it, describe } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/InMemory/InMemoryUsersRepository";
import { UserAlreadyExistsError } from "./errors/UserAlreadyExists";

describe("Register use case", () => {
  // TESTE UNITÁRIO - AO INSTANCIAR USE CASE, É PRECISO MOCKAR O REPOSITORY, PARA NÃO DEPENDER DE DEPENDÊNCIAS EXTERNAS
  const inMemoryUsersRepository = new InMemoryUsersRepository();
  const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

  it("It should be able to register", async () => {
    const { user } = await registerUseCase.execute({
      name: "fulano",
      email: "fulano1@teste.com.br",
      password: "123456"
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("It should be able to generate hash user password correctely", async () => {
    const { user } = await registerUseCase.execute({
      name: "Victor",
      email: "victor1@teste.com.br",
      password: "123456"
    });

    const isPasswordCorrectlyHashed = await compare("123456", user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it.skip("It should not be able to regiter with the same e-mail twice", async () => {
    const email = "user1@teste.com.br";

    await registerUseCase.execute({
      name: "Victor",
      email,
      password: "123456"
    });

    await expect(() => registerUseCase.execute({
      name: "Victor",
      email,
      password: "123456"
    })).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
