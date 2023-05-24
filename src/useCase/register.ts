import { hash } from "bcryptjs";
import { prisma } from "../lib/prisma";

interface RegisterUseCaseRequest{
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: any) { }

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userWithTheSameEmail = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (userWithTheSameEmail) {
      throw new Error("User already exists with the same email");
    }

    const password_hash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash
    });
  }
}
