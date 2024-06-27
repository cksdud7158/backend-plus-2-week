import { IsDateString, IsNumber, Min } from "class-validator";

export class ApplyReqDto {
  @IsNumber()
  @Min(1)
  userId: number;

  @IsNumber()
  @Min(1)
  lectureId: number;

  @IsDateString()
  registrationDate: string;
}
