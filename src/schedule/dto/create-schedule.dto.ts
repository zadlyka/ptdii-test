import {
  IsBoolean,
  IsEnum,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  Validate,
} from 'class-validator';
import { Day } from '../enums/day.enum';
import { DateRangeValidator } from '../../common/validators/date-range.validator';

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

  @IsNotEmpty()
  @Validate(DateRangeValidator)
  readonly date_range: string;

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
