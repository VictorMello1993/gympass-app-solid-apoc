import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../IUsersRepository";

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "user-1",
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      created_at: new Date()
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find(item => item.email === email);

    return user ?? null;
  }
}
