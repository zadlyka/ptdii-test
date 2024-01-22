import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Day } from '../enums/day.enum';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Day })
  day: Day;

  @Column({ type: 'time' })
  time_start: Date;

  @Column({ type: 'time' })
  time_finish: Date;

  @Column({ type: 'daterange' })
  date_range: Date;

  @Column({ type: 'smallint' })
  quota: number;

  @Column()
  status: boolean;

  @Column({ type: 'int' })
  doctor_id: number;

  @ManyToOne(() => Doctor, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;
}
