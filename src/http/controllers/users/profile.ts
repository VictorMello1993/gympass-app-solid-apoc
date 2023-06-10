import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfile } from "../../../useCase/factories/makeGetUserProfile";

export async function profile(req: FastifyRequest, res: FastifyReply) {
  const getUserProfile = makeGetUserProfile();

  const { user } = await getUserProfile.execute({
    userId: req.user.sub
  });

  return res.status(200).send({
    user: {
      ...user,
      password_hash: undefined
    }
  });
};
