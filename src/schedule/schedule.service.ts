import { FilterOperator, PaginateQuery, paginate } from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  create(createScheduleDto: CreateScheduleDto) {
    const schedule = this.scheduleRepository.create(createScheduleDto);
    return this.scheduleRepository.save(schedule);
  }

  findAll(query: PaginateQuery) {
    return paginate(query, this.scheduleRepository, {
      sortableColumns: ['id', 'doctor.name'],
      nullSort: 'last',
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['doctor.name'],
      filterableColumns: {
        doctor_id: [FilterOperator.EQ, FilterOperator.IN],
      },
      relations: ['doctor'],
    });
  }

  findOne(id: number) {
    return this.scheduleRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.findOne(id);
    this.scheduleRepository.update(id, {
      ...schedule,
      ...updateScheduleDto,
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const schedule = await this.findOne(id);
    this.scheduleRepository.remove(schedule);
    return;
  }
}
