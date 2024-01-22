import moment from 'moment';
import { FilterOperator, PaginateQuery, paginate } from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';

const NumberOfDay = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private dataSource: DataSource,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const schedules = this.generateBatch(createScheduleDto);
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager.save(schedules);
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
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

  private generateBatch(createScheduleDto: CreateScheduleDto) {
    const { date_start, date_finish, day, ...attr } = createScheduleDto;

    const start = moment(new Date(date_start));
    const end = moment(new Date(date_finish));

    const result = [];

    while (start.isSameOrBefore(end)) {
      if (start.day() === NumberOfDay[day]) {
        result.push(
          this.scheduleRepository.create({
            date: start.format('YYYY-MM-DD'),
            day,
            ...attr,
          }),
        );
      }

      start.add(1, 'day');
    }

    return result;
  }
}
