import { expect, it, describe } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";

describe("Register use case", () => {
  it("Should be able to generate hash user password correctely", async () => {
    // TESTE UNITÁRIO - AO INSTANCIAR USE CASE, É PRECISO MOCKAR O REPOSITORY, PARA NÃO DEPENDER DE DEPENDÊNCIAS EXTERNAS
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null;
      },
      async create(data) {
        return {
          id: "user-1",
          email: data.email,
          name: data.name,
          password_hash: data.password_hash,
          created_at: new Date()
        };
      }
    });

    const { user } = await registerUseCase.execute({
      name: "Victor",
      email: "victor1@teste.com.br",
      password: "123456"
    });

    const isPasswordCorrectlyHashed = await compare("123456", user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
