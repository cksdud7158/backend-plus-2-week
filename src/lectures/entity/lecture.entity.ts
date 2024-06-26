import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { LectureSchedule } from "./lectureSchedule.entity";

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100 })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column("varchar", { length: 50 })
  instructorName: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(() => LectureSchedule, (schedule) => schedule.lecture)
  schedules: LectureSchedule[];
}
