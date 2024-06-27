import { Inject, Injectable } from "@nestjs/common";

import { ILecturesService } from "./point.service.interface";
import {
  IREGISTRATION_HISTORY_REPOSITORY,
  IRegistrationHistoryRepository,
} from "../repository/registrationHistory/registrationHistory.repository.interface";
import {
  ILECTURE_REPOSITORY,
  ILectureRepository,
} from "../repository/lecture/lecture.repository.interface";
import { LecturesDomain } from "../domain/lectures.domain";

@Injectable()
export class LecturesServiceImpl implements ILecturesService {
  constructor(
    @Inject(IREGISTRATION_HISTORY_REPOSITORY)
    private readonly registrationHistoryRepository: IRegistrationHistoryRepository,
    @Inject(ILECTURE_REPOSITORY)
    private readonly lectureRepository: ILectureRepository,
  ) {}

  async lectures(): Promise<LecturesDomain> {
    return await this.lectureRepository.findAll();
  }

  async getRegistrationStatus(
    userId: number,
    registrationDate: string,
  ): Promise<boolean> {
    // history 테이블 에서 신청 날짜에 기록이 있는지 조회
    const registrationHistoryList =
      await this.registrationHistoryRepository.findByUserIdAndDate(
        userId,
        registrationDate,
      );

    // 조회된 데이터가 없으면 false
    if (!registrationHistoryList || !registrationHistoryList.length)
      return false;

    return true;
  }
}
