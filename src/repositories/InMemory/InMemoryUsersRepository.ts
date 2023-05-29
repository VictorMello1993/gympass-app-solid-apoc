import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../IUsersRepository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
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

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(item => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
}
