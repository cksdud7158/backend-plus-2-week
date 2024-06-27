import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ILecturesService } from "./lecture.service.interface";
import {
  IREGISTRATION_HISTORY_REPOSITORY,
  IRegistrationHistoryRepository,
} from "../repository/registrationHistory/registrationHistory.repository.interface";
import {
  ILECTURE_REPOSITORY,
  ILectureRepository,
} from "../repository/lecture/lecture.repository.interface";
import { LecturesDomain } from "../domain/lectures.domain";
import { DataSource } from "typeorm";

@Injectable()
export class LecturesServiceImpl implements ILecturesService {
  constructor(
    @Inject(IREGISTRATION_HISTORY_REPOSITORY)
    private readonly registrationHistoryRepository: IRegistrationHistoryRepository,
    @Inject(ILECTURE_REPOSITORY)
    private readonly lectureRepository: ILectureRepository,
    private readonly dataSource: DataSource,
  ) {}

  async lectures(): Promise<LecturesDomain> {
    return await this.lectureRepository.findAll();
  }

  async getRegistrationStatus(
    userId: number,
    lectureId: number,
    registrationDate: string,
  ): Promise<boolean> {
    // history 테이블 에서 신청 날짜에 기록이 있는지 조회
    const RegistrationHistoriesDomain =
      await this.registrationHistoryRepository.findByUserIdAndLectureIdAndDate(
        userId,
        lectureId,
        registrationDate,
      );

    return RegistrationHistoriesDomain.isRegistered();
  }

  async apply(
    userId: number,
    lectureId: number,
    registrationDate: string,
  ): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;
    try {
      // history 테이블 에서 신청 날짜에 기록이 있는지 조회
      let RegistrationHistoriesDomain =
        await this.registrationHistoryRepository.findByUserIdAndLectureIdAndDate(
          userId,
          lectureId,
          registrationDate,
          manager,
        );

      // 등록되어 있다면
      if (RegistrationHistoriesDomain.isRegistered()) {
        throw new BadRequestException("이미 신청되어있습니다.");
      }

      // 신청 가능 여부 확인 -> 30명이 넘었는지
      RegistrationHistoriesDomain =
        await this.registrationHistoryRepository.findByLectureIdAndDate(
          lectureId,
          registrationDate,
          manager,
        );

      // 불가능 하면 return false
      if (RegistrationHistoriesDomain.length > 29) {
        return false;
      }

      // 가능하면 신청
      await this.registrationHistoryRepository.insert(
        userId,
        lectureId,
        registrationDate,
        manager,
      );

      await queryRunner.commitTransaction();

      return true;
    } catch (e) {
      if (e.response.statusCode !== 400) {
        await queryRunner.rollbackTransaction();
      }
      throw e;
    } finally {
      await queryRunner.release();
      console.log("release");
    }
  }
}
