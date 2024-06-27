import { BadRequestException, Injectable } from "@nestjs/common";
import { IRegistrationHistoryRepository } from "./registrationHistory.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegistrationHistory } from "../../entity/registrationHistory.entity";
import { RegistrationHistoriesDomain } from "../../domain/registrationHistories.domain";
import { RegistrationHistoriesMapper } from "../../mapper/registrationHistories.mapper";
import { LectureSchedule } from "../../entity/lectureSchedule.entity";

@Injectable()
export class RegistrationHistoryRepositoryImpl
  implements IRegistrationHistoryRepository
{
  constructor(
    @InjectRepository(RegistrationHistory)
    private readonly registrationHistory: Repository<RegistrationHistory>,
    @InjectRepository(LectureSchedule)
    private readonly lectureSchedule: Repository<LectureSchedule>,
  ) {}

  async findByUserIdAndLectureIdAndDate(
    userId: number,
    lectureId: number,
    registrationDate: string,
  ): Promise<RegistrationHistoriesDomain> {
    const registrationHistoryList = await this.registrationHistory.find({
      relations: {
        lectureSchedule: {
          lecture: true,
        },
      },
      where: {
        userId: userId,
        lectureSchedule: {
          lectureDate: registrationDate,
          lecture: {
            id: lectureId,
          },
        },
      },
    });

    return RegistrationHistoriesMapper.toDomain(registrationHistoryList);
  }

  async findByLectureIdAndDate(
    lectureId: number,
    registrationDate: string,
  ): Promise<RegistrationHistoriesDomain> {
    const registrationHistoryList = await this.registrationHistory.find({
      relations: {
        lectureSchedule: { lecture: true },
      },
      where: {
        status: true,
        lectureSchedule: {
          lectureDate: registrationDate,
          lecture: {
            id: lectureId,
          },
        },
      },
    });

    return RegistrationHistoriesMapper.toDomain(registrationHistoryList);
  }

  async insert(
    userId: number,
    lectureId: number,
    registrationDate: string,
  ): Promise<boolean> {
    const lectureSchedule = await this.lectureSchedule.findOne({
      relations: {
        lecture: true,
      },
      where: {
        lectureDate: registrationDate,
        lecture: {
          id: lectureId,
        },
      },
    });

    if (!lectureSchedule) {
      throw new BadRequestException("해당 하는 날짜에 강의가 없습니다.");
    }

    await this.registrationHistory
      .createQueryBuilder()
      .insert()
      .into(RegistrationHistory)
      .values([
        {
          userId: userId,
          status: true,
          lectureSchedule: lectureSchedule,
        },
      ])
      .execute();

    return true;
  }
}
