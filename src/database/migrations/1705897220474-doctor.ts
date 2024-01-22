import { MigrationInterface, QueryRunner } from "typeorm";

export class Doctor1705897220474 implements MigrationInterface {
    name = 'Doctor1705897220474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "doctor" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_8dd1403bbff37a999799741fd4b" UNIQUE ("name"), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "doctor"`);
    }

}
