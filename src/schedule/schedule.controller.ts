import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { RequiredPermission } from '../auth/auth.guard';
import { Permission } from '../role/enums/permission.enum';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @RequiredPermission(Permission.CreateSchedule)
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  @RequiredPermission(Permission.ReadSchedule)
  findAll(@Paginate() query: PaginateQuery) {
    return this.scheduleService.findAll(query);
  }

  @Get(':id')
  @RequiredPermission(Permission.ReadSchedule)
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  @Patch(':id')
  @RequiredPermission(Permission.UpdateSchedule)
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  @RequiredPermission(Permission.DeleteSchedule)
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
