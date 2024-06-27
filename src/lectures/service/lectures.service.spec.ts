import { Test, TestingModule } from "@nestjs/testing";
import { lecturesServiceProvider } from "./point.service.provider";
import { RegistrationHistory } from "../entity/registrationHistory.entity";
import { ILECTURES_SERVICE, ILecturesService } from "./point.service.interface";
import {
  IREGISTRATION_HISTORY_REPOSITORY,
  IRegistrationHistoryRepository,
} from "../repository/registrationHistory/registrationHistory.repository.interface";
import {
  ILECTURE_REPOSITORY,
  ILectureRepository,
} from "../repository/lecture/lecture.repository.interface";
import { LecturesDomain } from "../domain/lectures.domain";

describe("LecturesService", () => {
  let service: ILecturesService;
  let registrationHistoryRepository: jest.Mocked<IRegistrationHistoryRepository>;
  let lectureRepository: jest.Mocked<ILectureRepository>;

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
        {
          provide: ILECTURE_REPOSITORY,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ILecturesService>(ILECTURES_SERVICE);
    registrationHistoryRepository = module.get(
      IREGISTRATION_HISTORY_REPOSITORY,
    );
    lectureRepository = module.get(ILECTURE_REPOSITORY);
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
        createdAt: new Date(),
      };
      //when
      jest
        .spyOn(registrationHistoryRepository, "findByUserIdAndDate")
        .mockResolvedValue([registrationHistory]);
      const res = await service.getRegistrationStatus(userId, registrationDate);

      //then
      expect(res).toBeTruthy();
    });
    it("특강 신청 실패", async () => {
      //given

      //when
      jest
        .spyOn(registrationHistoryRepository, "findByUserIdAndDate")
        .mockResolvedValue([]);
      const res = await service.getRegistrationStatus(userId, registrationDate);

      //then
      expect(res).toBeFalsy();
    });
  });

  describe("특강 목록 조회 (lectures)", () => {
    it("목록 조회 완료", async () => {
      //given
      const lecturesDomain = new LecturesDomain([
        {
          id: 1,
          title: "강의1",
          lectureDate: ["2024-06-19", "2024-06-18"],
          createdAt: 1719383112216,
          description: "강의1 설명",
          instructorName: "강사1",
        },
      ]);
      //when
      jest
        .spyOn(lectureRepository, "findAll")
        .mockResolvedValue(lecturesDomain);
      const res = await service.lectures();

      //then
      expect(res).toEqual(lecturesDomain);
    });
  });
});
