import { describe, afterAll, beforeAll, it, expect } from "vitest";
import { app } from "@/app";
import request from "supertest";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("It should be able to register", async () => {
    const response = await request(app.server)
      .post("/users")
      .send({
        name: "Victor Mello",
        email: "user@test.com",
        password: "123456"
      });

    expect(response.statusCode).toEqual(201);
  });
});
