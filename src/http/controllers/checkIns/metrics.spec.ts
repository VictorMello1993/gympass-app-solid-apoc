import { describe, afterAll, beforeAll, it, expect } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/createAndAuthenticateUser";
import { prisma } from "../../../lib/prisma";

describe("Check-in metrics (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("It should be able to get the total count of check-ins", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    // Insert manual da academia
    const gym = await prisma.gym.create({
      data: {
        name: "Javascript Gym",
        latitude: -23.0096896,
        longitude: -43.4798592
      }
    });

    // Inserção manual de check-ins na mesma academia
    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id
        },
        {
          gym_id: gym.id,
          user_id: user.id
        }
      ]
    });

    const response = await request(app.server)
      .get("/check-ins/metrics")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkInsCount).toEqual(2);
  });
});
