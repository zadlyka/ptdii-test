import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateScheduleDto } from './create-schedule.dto';

export class UpdateScheduleDto extends PartialType(
  OmitType(CreateScheduleDto, ['date_start', 'date_finish'] as const),
) {
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly date: Date;
}
