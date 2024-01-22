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
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { RequiredPermission } from '../auth/auth.guard';
import { Permission } from '../role/enums/permission.enum';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @RequiredPermission(Permission.CreateDoctor)
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  @RequiredPermission(Permission.ReadDoctor)
  findAll(@Paginate() query: PaginateQuery) {
    return this.doctorService.findAll(query);
  }

  @Get(':id')
  @RequiredPermission(Permission.ReadDoctor)
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  @RequiredPermission(Permission.UpdateDoctor)
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  @RequiredPermission(Permission.DeleteDoctor)
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
