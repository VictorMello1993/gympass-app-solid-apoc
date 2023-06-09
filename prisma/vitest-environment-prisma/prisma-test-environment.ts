import { Environment } from "vitest";

export default <Environment> {
  name: "prisma",
  async setup() {
    console.log("Antes de rodar os testes"); // Dentro do escopo de setup() fica o código a ser executado antes de cada teste
    return {
      async teardown() {
        console.log("Fim dos testes");
      } // Função a ser executada depois de cada teste
    };
  }
};
