import { describe, afterAll, beforeAll, it, expect } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/createAndAuthenticateUser";
import { prisma } from "../../../lib/prisma";

describe("Create check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("It should be able to check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    // Insert manual da academia
    const gym = await prisma.gym.create({
      data: {
        name: "Javascript Gym",
        latitude: -23.0096896,
        longitude: -43.4798592
      }
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -23.0096896,
        longitude: -43.4798592
      });

    expect(response.statusCode).toEqual(201);
  });
});
