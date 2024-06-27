import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";

import { IdPipe } from "../pipes/id.pipe";
import { DatePipe } from "../pipes/date.pipe";
import {
  ILECTURES_SERVICE,
  ILecturesService,
} from "../service/lecture.service.interface";
import { LecturesDomain } from "../domain/lectures.domain";
import { ApplyReqDto } from "../dto/apply.dto";

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

  @Get("application/:userId/:lectureId/:registrationDate")
  async registrationStatus(
    @Param("userId", IdPipe) userId: number,
    @Param("lectureId", IdPipe) lectureId: number,
    @Param("registrationDate", DatePipe) registrationDate: string,
  ): Promise<boolean> {
    return this.lecturesService.getRegistrationStatus(
      userId,
      lectureId,
      registrationDate,
    );
  }

  @Post("apply")
  async apply(@Body() applyReqDto: ApplyReqDto): Promise<boolean> {
    return this.lecturesService.apply(
      applyReqDto.userId,
      applyReqDto.lectureId,
      applyReqDto.registrationDate,
    );
  }
}
