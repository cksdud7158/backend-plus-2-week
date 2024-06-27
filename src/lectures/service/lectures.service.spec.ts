import { Test, TestingModule } from "@nestjs/testing";
import { lecturesServiceProvider } from "./point.service.provider";
import {
  ILECTURES_SERVICE,
  ILecturesService,
} from "./lecture.service.interface";
import {
  IREGISTRATION_HISTORY_REPOSITORY,
  IRegistrationHistoryRepository,
} from "../repository/registrationHistory/registrationHistory.repository.interface";
import {
  ILECTURE_REPOSITORY,
  ILectureRepository,
} from "../repository/lecture/lecture.repository.interface";
import { LecturesDomain } from "../domain/lectures.domain";
import { RegistrationHistoriesDomain } from "../domain/registrationHistories.domain";
import { BadRequestException } from "@nestjs/common";

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
            findByLectureIdAndDate: jest.fn(),
            insert: jest.fn(),
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
  const lectureId = 1;
  const registrationDate = "2024-06-24";
  const status = true;

  describe("특강 신청 완료 여부 조회 (getRegistrationStatus)", () => {
    it("특강 신청 완료 상태", async () => {
      //given
      const registrationHistoriesDomain = new RegistrationHistoriesDomain([
        {
          id: 1,
          status,
          createdAt: 0,
          userId,
        },
      ]);
      //when
      jest
        .spyOn(registrationHistoryRepository, "findByUserIdAndLectureIdAndDate")
        .mockResolvedValue(registrationHistoriesDomain);
      const res = await service.getRegistrationStatus(
        userId,
        lectureId,
        registrationDate,
      );

      //then
      expect(res).toBeTruthy();
    });
    it("특강 신청 실패 상태", async () => {
      //given
      const lecturesDomain = new RegistrationHistoriesDomain([]);

      //when
      jest
        .spyOn(registrationHistoryRepository, "findByUserIdAndLectureIdAndDate")
        .mockResolvedValue(lecturesDomain);
      const res = await service.getRegistrationStatus(
        userId,
        lectureId,
        registrationDate,
      );

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

  describe("특강 신청 (apply)", () => {
    it("특강 신청 완료", async () => {
      //given

      //when
      jest
        .spyOn(registrationHistoryRepository, "findByUserIdAndLectureIdAndDate")
        .mockResolvedValue(new RegistrationHistoriesDomain([]));

      jest
        .spyOn(registrationHistoryRepository, "findByLectureIdAndDate")
        .mockResolvedValue(new RegistrationHistoriesDomain([]));
      const res = await service.apply(userId, lectureId, registrationDate);

      //then
      expect(res).toBeTruthy();
    });

    it("특강 신청 실패(이미 신청한 경우)", async () => {
      //given

      //when

      const res = service.apply(userId, lectureId, registrationDate);

      //then
      await expect(res).rejects.toThrow(BadRequestException);
    });

    it("특강 신청 실패(이미 신청한 경우)", async () => {
      //given

      //when
      jest
        .spyOn(registrationHistoryRepository, "findByUserIdAndLectureIdAndDate")
        .mockResolvedValue(new RegistrationHistoriesDomain([]));

      jest
        .spyOn(registrationHistoryRepository, "findByLectureIdAndDate")
        .mockResolvedValue(
          new RegistrationHistoriesDomain(
            Array.from({ length: 30 }).map(() => ({
              id: 0,
              userId,
              status: true,
              createdAt: 0,
            })),
          ),
        );

      const res = await service.apply(userId, lectureId, registrationDate);

      //then
      expect(res).toBeFalsy();
    });
  });
});
