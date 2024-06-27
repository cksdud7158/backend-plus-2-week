import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ILectureRepository } from "./lecture.repository.interface";
import { LecturesDomain } from "../../domain/lectures.domain";
import { Lecture } from "../../entity/lecture.entity";

@Injectable()
export class LectureRepositoryImpl implements ILectureRepository {
  constructor(
    @InjectRepository(Lecture)
    private readonly lecture: Repository<Lecture>,
  ) {}

  async findAll(): Promise<LecturesDomain> {
    const lectures = await this.lecture.find({
      relations: {
        schedules: true,
      },
    });

    return new LecturesDomain(
      lectures.map((lecture) => ({
        id: lecture.id,
        title: lecture.title,
        lectureDate: lecture.schedules.map((schedule) => schedule.lectureDate),
        createdAt: lecture.createdAt.getTime(),
        description: lecture.description,
        instructorName: lecture.instructorName,
      })),
    );
  }
}
