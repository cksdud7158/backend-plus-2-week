import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @OneToMany(() => LectureSchedule, (schedule) => schedule.lecture)
  @JoinColumn()
  schedules: LectureSchedule[];
}
