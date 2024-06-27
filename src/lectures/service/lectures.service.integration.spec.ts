// import { Test, TestingModule } from "@nestjs/testing";
// import { lecturesServiceProvider } from "./point.service.provider";
// import {
//   ILECTURES_SERVICE,
//   ILecturesService,
// } from "./lecture.service.interface";
// import {
//   IREGISTRATION_HISTORY_REPOSITORY,
//   IRegistrationHistoryRepository,
// } from "../repository/registrationHistory/registrationHistory.repository.interface";
// import {
//   ILECTURE_REPOSITORY,
//   ILectureRepository,
// } from "../repository/lecture/lecture.repository.interface";
// import { RegistrationHistoryRepositoryImpl } from "../repository/registrationHistory/registrationHistory.repository";
// import { LectureRepositoryImpl } from "../repository/lecture/lecture.repository";
//
// describe("LecturesService", () => {
//   let service: ILecturesService;
//   let registrationHistoryRepository: jest.Mocked<IRegistrationHistoryRepository>;
//   let lectureRepository: jest.Mocked<ILectureRepository>;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         lecturesServiceProvider,
//         {
//           provide: IREGISTRATION_HISTORY_REPOSITORY,
//           useClass: RegistrationHistoryRepositoryImpl,
//         },
//         {
//           provide: ILECTURE_REPOSITORY,
//           useClass: LectureRepositoryImpl,
//         },
//       ],
//     }).compile();
//
//     service = module.get<ILecturesService>(ILECTURES_SERVICE);
//     registrationHistoryRepository = module.get(
//       IREGISTRATION_HISTORY_REPOSITORY,
//     );
//     lectureRepository = module.get(ILECTURE_REPOSITORY);
//   });
//
//   it("should be defined", () => {
//     expect(service).toBeDefined();
//   });
//
//   const userId = 1;
//   const lectureId = 1;
//   const registrationDate = "2024-06-24";
//   const status = true;
//
//   describe("포인트 충전/사용 동시성 테스트", () => {
//     it("포인트 충전과 사용이 동시에 여러번 일어났을때 최종 결과값이 올바른지 테스트", async () => {
//       //given
//
//       //when
//       await Promise.all([service.apply()]);
//       //then
//       const finalResult = await pointService.getPoint(1);
//       expect(chargeSpy).toHaveBeenCalledTimes(2);
//       expect(useSpy).toHaveBeenCalledTimes(2);
//       expect(finalResult.getPoint()).toBe(1500); // 1000 - 500 + 2000 - 1000
//       chargeSpy.mockRestore();
//       useSpy.mockRestore();
//     });
//
//     // it('포인트 충전과 사용이 동시에 여러번 일어나는 중에, 포인트 사용 잔액이 모자랄 경우에 오류가 발생하는지 테스트', async () => {
//     //   //given
//     //   const chargeSpy = jest.spyOn(pointService, 'charge');
//     //   const useSpy = jest.spyOn(pointService, 'use');
//     //
//     //   //when
//     //   const results = await Promise.allSettled([
//     //     pointService.charge(1, new PointBody(500)),
//     //     pointService.use(1, new PointBody(500)),
//     //     pointService.charge(1, new PointBody(1000)),
//     //     pointService.use(1, new PointBody(2000)),
//     //   ]);
//     //
//     //   //then
//     //   const rejected = results.filter(result => result.status === 'rejected');
//     //   expect(rejected.length).toBe(1);
//     //   expect(rejected[0].status).toBe('rejected');
//     //   expect(chargeSpy).toHaveBeenCalledTimes(2);
//     //   expect(useSpy).toHaveBeenCalledTimes(2);
//     //   chargeSpy.mockRestore();
//     //   useSpy.mockRestore();
//     // });
//   });
// });
