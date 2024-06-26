import { Module } from "@nestjs/common";
import { LecturesController } from "./controller/lectures.controller";
import { lecturesServiceProvider } from "./service/point.service.provider";
import { registrationHistoryRepositoryProviders } from "./repository/registrationHistory.repository.provider";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegistrationHistory } from "./entity/registrationHistory.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RegistrationHistory])],
  controllers: [LecturesController],
  providers: [lecturesServiceProvider, registrationHistoryRepositoryProviders],
})
export class LecturesModule {}
