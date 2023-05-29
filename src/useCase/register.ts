import { hash } from "bcryptjs";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { UserAlreadyExistsError } from "./errors/UserAlreadyExistsError";

interface RegisterUseCaseRequest{
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userWithTheSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithTheSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    });

    return { user };
  }
}
