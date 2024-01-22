import { FilterOperator, PaginateQuery, paginate } from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  create(createDoctorDto: CreateDoctorDto) {
    const doctor = this.doctorRepository.create(createDoctorDto);
    return this.doctorRepository.save(doctor);
  }

  findAll(query: PaginateQuery) {
    return paginate(query, this.doctorRepository, {
      sortableColumns: ['id', 'name'],
      nullSort: 'last',
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name'],
      filterableColumns: {
        name: [FilterOperator.EQ],
      },
    });
  }

  findOne(id: number) {
    return this.doctorRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.findOne(id);
    this.doctorRepository.update(id, {
      ...doctor,
      ...updateDoctorDto,
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const doctor = await this.findOne(id);
    this.doctorRepository.remove(doctor);
    return;
  }
}
