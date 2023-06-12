import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(req: FastifyRequest, res: FastifyReply) {
  // Aqui o token original não é mais visível no header da requisição
  // Só olha se possui refresh token para verificar se o usuário ainda pode se manter logado ou não dependendo do tempo de expiração do mesmo
  await req.jwtVerify({ onlyCookie: true });

  const token = await res.jwtSign({}, {
    sign: {
      sub: req.user.sub
    }
  });

  const refreshToken = await res.jwtSign({}, {
    sign: {
      sub: req.user.sub,
      expiresIn: "7d"
    }
  });

  return res
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true, // HTTPS
      sameSite: true,
      httpOnly: true
    })
    .status(200).send({
      token
    });
};
