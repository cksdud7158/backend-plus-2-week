import { IREGISTRATION_HISTORY_REPOSITORY } from "./registrationHistory.repository.interface";
import { RegistrationHistoryRepositoryImpl } from "./registrationHistory.repository";

export const registrationHistoryRepositoryProviders = {
  provide: IREGISTRATION_HISTORY_REPOSITORY,
  useClass: RegistrationHistoryRepositoryImpl,
};
