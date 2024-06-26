import { Test, TestingModule } from "@nestjs/testing";
import { lecturesServiceProvider } from "./point.service.provider";
import {
  IREGISTRATION_HISTORY_REPOSITORY,
  IRegistrationHistoryRepository,
} from "../repository/registrationHistory.repository.interface";
import { RegistrationHistory } from "../entity/registrationHistory.entity";
import { ILECTURES_SERVICE, ILecturesService } from "./point.service.interface";

describe("LecturesService", () => {
  let service: ILecturesService;
  let repository: jest.Mocked<IRegistrationHistoryRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ILecturesService>(ILECTURES_SERVICE);
    repository = module.get(IREGISTRATION_HISTORY_REPOSITORY);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  const userId = 1;
  const registrationDate = "2024-06-24";
  const status = true;

  describe("특강 신청 완료 여부 조회 (getRegistrationStatus)", () => {
    it("특강 신청 완료", async () => {
      //given
      const registrationHistory: RegistrationHistory = {
        lectureSchedule: undefined,
        id: 0,
        userId,
        status,
        createdAt: 0,
      };
      //when
      jest
        .spyOn(repository, "findByUserIdAndDate")
        .mockResolvedValue([registrationHistory]);
      const res = await service.getRegistrationStatus(userId, registrationDate);

      //then
      expect(res).toBeTruthy();
    });
    it("특강 신청 실패", async () => {
      //given

      //when
      jest.spyOn(repository, "findByUserIdAndDate").mockResolvedValue([]);
      const res = await service.getRegistrationStatus(userId, registrationDate);

      //then
      expect(res).toBeFalsy();
    });
  });
});
