import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDateSchedule1705924815642 implements MigrationInterface {
  name = 'UpdateDateSchedule1705924815642';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedule" RENAME COLUMN "date_range" TO "date"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."schedule_day_enum" RENAME TO "schedule_day_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."schedule_day_enum" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ALTER COLUMN "day" TYPE "public"."schedule_day_enum" USING "day"::"text"::"public"."schedule_day_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."schedule_day_enum_old"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "date"`);
    await queryRunner.query(`ALTER TABLE "schedule" ADD "date" date NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "date" daterange NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."schedule_day_enum_old" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ALTER COLUMN "day" TYPE "public"."schedule_day_enum_old" USING "day"::"text"::"public"."schedule_day_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."schedule_day_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."schedule_day_enum_old" RENAME TO "schedule_day_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" RENAME COLUMN "date" TO "date_range"`,
    );
  }
}
