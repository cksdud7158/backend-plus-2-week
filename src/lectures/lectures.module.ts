import { Module } from "@nestjs/common";
import { LecturesController } from "./controller/lectures.controller";
import { lecturesServiceProvider } from "./service/point.service.provider";

import { TypeOrmModule } from "@nestjs/typeorm";
import { RegistrationHistory } from "./entity/registrationHistory.entity";
import { registrationHistoryRepositoryProviders } from "./repository/registrationHistory/registrationHistory.repository.provider";
import { lectureRepositoryProviders } from "./repository/lecture/lecture.repository.provider";
import { Lecture } from "./entity/lecture.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RegistrationHistory, Lecture])],
  controllers: [LecturesController],
  providers: [
    lecturesServiceProvider,
    registrationHistoryRepositoryProviders,
    lectureRepositoryProviders,
  ],
})
export class LecturesModule {}
