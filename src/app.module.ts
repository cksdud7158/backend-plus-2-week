import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LecturesModule } from "./lectures/lectures.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "../typeorm.config";

@Module({
  imports: [LecturesModule, TypeOrmModule.forRoot(typeORMConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
