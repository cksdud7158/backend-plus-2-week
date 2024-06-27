import { Injectable } from "@nestjs/common";
import { IRegistrationHistoryRepository } from "./registrationHistory.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegistrationHistory } from "../../entity/registrationHistory.entity";

@Injectable()
export class RegistrationHistoryRepositoryImpl
  implements IRegistrationHistoryRepository
{
  constructor(
    @InjectRepository(RegistrationHistory)
    private readonly registrationHistory: Repository<RegistrationHistory>,
  ) {}

  async findByUserIdAndDate(
    userId: number,
    registrationDate: string,
  ): Promise<RegistrationHistory[]> {
    return await this.registrationHistory.find({
      relations: {
        lectureSchedule: true,
      },
      where: {
        userId: userId,
        lectureSchedule: {
          lectureDate: registrationDate,
        },
      },
    });
  }
}
