import { Inject, Injectable } from "@nestjs/common";
import {
  IREGISTRATION_HISTORY_REPOSITORY,
  IRegistrationHistoryRepository,
} from "../repository/registrationHistory.repository.interface";
import { ILecturesService } from "./point.service.interface";

@Injectable()
export class LecturesServiceImpl implements ILecturesService {
  constructor(
    @Inject(IREGISTRATION_HISTORY_REPOSITORY)
    private readonly registrationHistoryRepositoryImpl: IRegistrationHistoryRepository,
  ) {}

  async getRegistrationStatus(
    userId: number,
    registrationDate: string,
  ): Promise<boolean> {
    // history 테이블 에서 신청 날짜에 기록이 있는지 조회
    const registrationHistoryList =
      await this.registrationHistoryRepositoryImpl.findByUserIdAndDate(
        userId,
        registrationDate,
      );

    // 조회된 데이터가 없으면 false
    if (!registrationHistoryList || !registrationHistoryList.length)
      return false;

    return true;
  }
}
