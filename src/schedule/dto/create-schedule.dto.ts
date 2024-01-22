import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Day } from '../enums/day.enum';

export class CreateScheduleDto {
  @IsEnum(Day)
  @IsNotEmpty()
  readonly day: Day;

  @IsMilitaryTime()
  @IsNotEmpty()
  readonly time_start: string;

  @IsMilitaryTime()
  @IsNotEmpty()
  readonly time_finish: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly date_start: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly date_finish: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly quota: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly status: boolean;

  @IsNumber()
  @IsNotEmpty()
  readonly doctor_id: number;
}
