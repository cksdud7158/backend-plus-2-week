import { LecturesController } from "./lectures.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { ILECTURE_REPOSITORY } from "../repository/lecture/lecture.repository.interface";
import { ILECTURES_SERVICE } from "../service/lecture.service.interface";
import { LecturesServiceImpl } from "../service/lectures.service";
import { IREGISTRATION_HISTORY_REPOSITORY } from "../repository/registrationHistory/registrationHistory.repository.interface";
import { LecturesDomain } from "../domain/lectures.domain";
import { ApplyReqDto } from "../dto/apply.dto";
import { lecturesServiceProvider } from "../service/point.service.provider";
import { RegistrationHistoriesDomain } from "../domain/registrationHistories.domain";

describe("LecturesController", () => {
  let controller: LecturesController;
  let service: LecturesServiceImpl;

  const userId = 1;
  const registrationDate = "2024-06-24";
  const lectureId = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LecturesController],
      providers: [
        lecturesServiceProvider,
        {
          provide: IREGISTRATION_HISTORY_REPOSITORY,
          useValue: {
            findByUserIdAndLectureIdAndDate: jest.fn(() => {
              return Promise.resolve(
                new RegistrationHistoriesDomain([
                  {
                    id: 1,
                    status: true,
                    createdAt: 0,
                    userId: 1,
                  },
                ]),
              );
            }),
          },
        },
        {
          provide: ILECTURE_REPOSITORY,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LecturesController>(LecturesController);
    service = module.get(ILECTURES_SERVICE);
  });

  describe("/lectures/application/{userId} (GET)", () => {
    it("특강 신청 완료", async () => {
      //given

      //when
      jest.spyOn(service, "getRegistrationStatus").mockResolvedValue(true);
      const res = await controller.registrationStatus(
        userId,
        lectureId,
        registrationDate,
      );

      //then
      expect(res).toBeTruthy();
    });
  });

  describe("/lectures (GET)", () => {
    it("특강 목록 조회", async () => {
      //given
      const lectures = new LecturesDomain([
        {
          id: 1,
          title: "title1",
          description: "desc1",
          instructorName: "깅시1",
          lectureDate: ["2024-06-27"],
          createdAt: 0,
        },
      ]);
      //when
      jest.spyOn(service, "lectures").mockResolvedValue(lectures);
      const res = await controller.registrationStatus(
        userId,
        lectureId,
        registrationDate,
      );

      //then
      expect(res).toBeTruthy();
    });
  });

  describe("/lectures/apply (POST)", () => {
    it("특강 신청", async () => {
      //given
      const applyReqDto: ApplyReqDto = {
        userId,
        lectureId,
        registrationDate,
      };

      //when
      jest.spyOn(service, "apply").mockResolvedValue(true);
      const res = await controller.apply(applyReqDto);

      //then
      expect(res).toBeTruthy();
    });
  });
});
