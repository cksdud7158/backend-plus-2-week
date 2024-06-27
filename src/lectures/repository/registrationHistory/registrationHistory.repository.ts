import { BadRequestException, Injectable } from "@nestjs/common";
import { IRegistrationHistoryRepository } from "./registrationHistory.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
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
    manager?: EntityManager,
  ): Promise<RegistrationHistoriesDomain> {
    const options = {
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
    };
    let registrationHistoryList: RegistrationHistory[];
    if (manager) {
      registrationHistoryList = await manager.find(RegistrationHistory, {
        ...options,
        lock: { mode: "pessimistic_write" },
      });
    } else
      registrationHistoryList = await this.registrationHistory.find(options);

    return RegistrationHistoriesMapper.toDomain(registrationHistoryList);
  }

  async findByLectureIdAndDate(
    lectureId: number,
    registrationDate: string,
    manager?: EntityManager,
  ): Promise<RegistrationHistoriesDomain> {
    const options = {
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
    };
    let registrationHistoryList: RegistrationHistory[];
    if (manager) {
      registrationHistoryList = await manager.find(
        RegistrationHistory,
        options,
      );
    } else {
      registrationHistoryList = await this.registrationHistory.find(options);
    }

    return RegistrationHistoriesMapper.toDomain(registrationHistoryList);
  }

  async insert(
    userId: number,
    lectureId: number,
    registrationDate: string,
    manager?: EntityManager,
  ): Promise<boolean> {
    const options = {
      relations: {
        lecture: true,
      },
      where: {
        lectureDate: registrationDate,
        lecture: {
          id: lectureId,
        },
      },
    };
    let lectureSchedule: LectureSchedule;
    if (manager) {
      lectureSchedule = await manager.findOne(LectureSchedule, options);
    } else lectureSchedule = await this.lectureSchedule.findOne(options);

    if (!lectureSchedule) {
      throw new BadRequestException("해당 하는 날짜에 강의가 없습니다.");
    }

    if (manager) {
      await manager.insert(RegistrationHistory, {
        userId: userId,
        status: true,
        lectureSchedule: lectureSchedule,
      });
    } else {
      await this.registrationHistory.insert({
        userId: userId,
        status: true,
        lectureSchedule: lectureSchedule,
      });
    }

    return true;
  }
}
