import { RegistrationHistory } from "../../entity/registrationHistory.entity";

export const IREGISTRATION_HISTORY_REPOSITORY =
  "IRegistrationHistoryRepository";

export interface IRegistrationHistoryRepository {
  findByUserIdAndDate(
    userId: number,
    registrationDate: string,
  ): Promise<RegistrationHistory[]>;
}
