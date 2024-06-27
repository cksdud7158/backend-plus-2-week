import { LecturesDomain } from "../domain/lectures.domain";

export const ILECTURES_SERVICE = "ILecturesService";

export interface ILecturesService {
  lectures(): Promise<LecturesDomain>;

  getRegistrationStatus(
    userId: number,
    lectureId: number,
    registrationDate: string,
  ): Promise<boolean>;

  apply(
    userId: number,
    lectureId: number,
    registrationDate: string,
  ): Promise<boolean>;
}
