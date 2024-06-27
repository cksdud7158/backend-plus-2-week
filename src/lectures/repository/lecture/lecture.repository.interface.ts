import { LecturesDomain } from "../../domain/lectures.domain";

export const ILECTURE_REPOSITORY = "ILectureRepository";

export interface ILectureRepository {
  findAll(): Promise<LecturesDomain>;
}
