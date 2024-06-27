import { RegistrationHistoriesDomain } from "../../domain/registrationHistories.domain";
import { EntityManager } from "typeorm";

export const IREGISTRATION_HISTORY_REPOSITORY =
  "IRegistrationHistoryRepository";

export interface IRegistrationHistoryRepository {
  findByUserIdAndLectureIdAndDate(
    userId: number,
    lectureId: number,
    registrationDate: string,
    entityManager?: EntityManager,
  ): Promise<RegistrationHistoriesDomain>;

  findByLectureIdAndDate(
    lectureId: number,
    registrationDate: string,
    manager?: EntityManager,
  ): Promise<RegistrationHistoriesDomain>;

  insert(
    userId: number,
    lectureId: number,
    registrationDate: string,
    manager?: EntityManager,
  ): Promise<boolean>;
}
