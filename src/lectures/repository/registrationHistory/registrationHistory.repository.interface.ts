import { RegistrationHistoriesDomain } from "../../domain/registrationHistories.domain";

export const IREGISTRATION_HISTORY_REPOSITORY =
  "IRegistrationHistoryRepository";

export interface IRegistrationHistoryRepository {
  findByUserIdAndLectureIdAndDate(
    userId: number,
    lectureId: number,
    registrationDate: string,
  ): Promise<RegistrationHistoriesDomain>;

  findByLectureIdAndDate(
    lectureId: number,
    registrationDate: string,
  ): Promise<RegistrationHistoriesDomain>;

  insert(
    userId: number,
    lectureId: number,
    registrationDate: string,
  ): Promise<boolean>;
}
