import { ILECTURE_REPOSITORY } from "./lecture.repository.interface";
import { LectureRepositoryImpl } from "./lecture.repository";

export const lectureRepositoryProviders = {
  provide: ILECTURE_REPOSITORY,
  useClass: LectureRepositoryImpl,
};
