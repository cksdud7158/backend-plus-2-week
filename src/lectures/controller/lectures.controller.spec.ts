import { Test, TestingModule } from "@nestjs/testing";
import { LecturesController } from "./lectures.controller";
import { LecturesServiceImpl } from "../service/lectures.service";
import { lecturesServiceProvider } from "../service/point.service.provider";
import { IREGISTRATION_HISTORY_REPOSITORY } from "../repository/registrationHistory.repository.interface";
import { ILECTURES_SERVICE } from "../service/point.service.interface";

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
});
