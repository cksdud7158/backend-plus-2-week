import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lecture } from "./lecture.entity";
import { RegistrationHistory } from "./registrationHistory.entity";

@Entity()
export class LectureSchedule {
  @PrimaryGeneratedColumn()
  @OneToOne(
    () => RegistrationHistory,
    (RegistrationHistory) => RegistrationHistory.lectureSchedule,
  )
  id: number;

  @ManyToOne(() => Lecture, (lecture) => lecture.schedules, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn()
  lecture: Lecture;

  @Column({ type: "date" })
  lectureDate: string;
}
