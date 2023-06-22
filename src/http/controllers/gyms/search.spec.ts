import { describe, afterAll, beforeAll, it, expect } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/createAndAuthenticateUser";

describe("Search gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("It should be able to search a gym by name", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Javascript Gym",
        description: "Javascript gym description",
        phone: "1199999999",
        latitude: -23.0096896,
        longitude: -43.4798592
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Typescript Gym",
        description: "Typescript gym description",
        phone: "1199999999",
        latitude: -23.0096896,
        longitude: -43.4798592
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "Javascript"
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: "Javascript Gym"
      })
    ]);
  });
});
