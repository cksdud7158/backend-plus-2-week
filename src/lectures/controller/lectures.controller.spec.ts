import { Test, TestingModule } from "@nestjs/testing";
import { LecturesController } from "./lectures.controller";
import { LecturesServiceImpl } from "../service/lectures.service";
import { lecturesServiceProvider } from "../service/point.service.provider";
import { IREGISTRATION_HISTORY_REPOSITORY } from "../repository/registrationHistory/registrationHistory.repository.interface";
import { ILECTURES_SERVICE } from "../service/point.service.interface";
import { ILECTURE_REPOSITORY } from "../repository/lecture/lecture.repository.interface";
import { LecturesDomain } from "../domain/lectures.domain";

describe("LecturesController", () => {
  let controller: LecturesController;
  let service: LecturesServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LecturesController],
      providers: [
        lecturesServiceProvider,
        {
          provide: IREGISTRATION_HISTORY_REPOSITORY,
          useValue: {
            findByUserIdAndDate: jest.fn(),
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

  const userId = 1;
  const registrationDate = "2024-06-24";

  describe("/lectures/application/{userId} (GET)", () => {
    it("특강 신청 완료", () => {
      //given

      //when
      jest.spyOn(service, "getRegistrationStatus").mockResolvedValue(true);
      const res = controller.registrationStatus(userId, registrationDate);

      //then
      expect(res).toBeTruthy();
    });
  });

  describe("/lectures (GET)", () => {
    it("특강 목록 조회", () => {
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
      const res = controller.registrationStatus(userId, registrationDate);

      //then
      expect(res).toBeTruthy();
    });
  });
});
