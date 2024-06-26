export const ILECTURES_SERVICE = "ILecturesService";

export interface ILecturesService {
  getRegistrationStatus(
    userId: number,
    registrationDate: string,
  ): Promise<boolean>;
}
