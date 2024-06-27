import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { LectureSchedule } from "./lectureSchedule.entity";

@Entity()
export class RegistrationHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => LectureSchedule, (schedule) => schedule.id, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn()
  lectureSchedule: LectureSchedule;

  @Column({ type: "boolean" })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
