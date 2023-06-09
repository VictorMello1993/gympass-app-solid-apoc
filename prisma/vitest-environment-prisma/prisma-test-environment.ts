import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);

  // searchParams: indica o schema da connection string do Postgres
  // Por padrão, schema=public representa o schema primário do banco de dados Postgres
  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment> {
  name: "prisma",
  async setup() { // Dentro do escopo de setup() fica o código a ser executado antes de cada teste
    const schema = randomUUID();

    const newDatabaseURL = generateDatabaseURL(schema);

    // ex: DATABASE_URL="postgresql://your_user:password@host:5432/database_name?schema=v6A6VFfs6FS6FSFSasagsgas6aags6HS"
    console.log(newDatabaseURL);

    process.env.DATABASE_URL = newDatabaseURL;

    // Executando as migrations para cada banco de dados criado em cada teste
    execSync("npx prisma migrate deploy");

    return {
      // Função a ser executada depois de cada teste
      async teardown() {
        // Dropando o banco de dados depois de cada teste realizado
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);

        await prisma.$disconnect();
      }
    };
  }
};
