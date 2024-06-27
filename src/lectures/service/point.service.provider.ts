import { ILECTURES_SERVICE } from "./lecture.service.interface";
import { LecturesServiceImpl } from "./lectures.service";

export const lecturesServiceProvider = {
  provide: ILECTURES_SERVICE,
  useClass: LecturesServiceImpl,
};
