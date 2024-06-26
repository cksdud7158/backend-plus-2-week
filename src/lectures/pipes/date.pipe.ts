import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { isDateString } from "class-validator";

@Injectable()
export class DatePipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!isDateString(value)) {
      throw new BadRequestException("Invalid value");
    }

    return value;
  }
}
