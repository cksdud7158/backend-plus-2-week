import { Controller, Get, Inject, Param } from "@nestjs/common";

import { UserIdPipe } from "../pipes/userId.pipe";
import { DatePipe } from "../pipes/date.pipe";
import {
  ILECTURES_SERVICE,
  ILecturesService,
} from "../service/point.service.interface";
import { LecturesDomain } from "../domain/lectures.domain";

@Controller("lectures")
export class LecturesController {
  constructor(
    @Inject(ILECTURES_SERVICE)
    private readonly lecturesService: ILecturesService,
  ) {}

  @Get("")
  async lectures(): Promise<LecturesDomain> {
    return await this.lecturesService.lectures();
  }

  @Get("application/:userId/:registrationDate")
  async registrationStatus(
    @Param("userId", UserIdPipe) userId: number,
    @Param("registrationDate", DatePipe) registrationDate: string,
  ): Promise<boolean> {
    return this.lecturesService.getRegistrationStatus(userId, registrationDate);
  }
}
