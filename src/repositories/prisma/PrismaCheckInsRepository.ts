import { Prisma, CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../ICheckInsRepository";
import { prisma } from "../../lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data
    });

    return checkIn;
  }

  async update(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id
      },
      data
    });

    return checkIn;
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    });

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date"); // Primeiro dia da data atual com sem o horário (00: 00: 00)
    const endOfTheDay = dayjs(date).endOf("date"); // Primeiro dia da data atual às 23:59:59

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    });

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      take: 20,
      skip: (page - 1) * 20
    });

    return checkIns;
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    });

    return count;
  }
}
