import { ILECTURES_SERVICE } from "./point.service.interface";
import { LecturesServiceImpl } from "./lectures.service";

export const lecturesServiceProvider = {
  provide: ILECTURES_SERVICE,
  useClass: LecturesServiceImpl,
};
