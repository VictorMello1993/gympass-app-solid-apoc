import { describe, afterAll, beforeAll, it, expect } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/createAndAuthenticateUser";

describe("Search gyms nearby (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("It should be able to find gyms nearby", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Near Gym",
        description: null,
        phone: null,
        latitude: -23.0096896,
        longitude: -43.4798592
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Far Gym",
        description: null,
        phone: null,
        latitude: -22.9597295,
        longitude: -43.6398476
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -23.0096896,
        longitude: -43.4798592
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: "Near Gym"
      })
    ]);
  });
});
