import {MigrationInterface, QueryRunner} from "typeorm";

export class integration1618051967952 implements MigrationInterface {
    name = 'integration1618051967952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comic" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comicId" character varying NOT NULL, "comicThumb" character varying NOT NULL, "comicName" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_071fba28990ddf3518fcd165624" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "nickName" character varying NOT NULL, "birthDay" TIMESTAMP NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_f15a1d20dcbcde42b43563aaecb" UNIQUE ("nickName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "char" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "charId" character varying NOT NULL, "charThumb" character varying NOT NULL, "charName" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_0e679f78cd9fa5a731d248eabdc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comic" ADD CONSTRAINT "FK_34ecc63b3222e28a991eb7476ed" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "char" ADD CONSTRAINT "FK_1b3c6c71fcaa5668c78fb3819cc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "char" DROP CONSTRAINT "FK_1b3c6c71fcaa5668c78fb3819cc"`);
        await queryRunner.query(`ALTER TABLE "comic" DROP CONSTRAINT "FK_34ecc63b3222e28a991eb7476ed"`);
        await queryRunner.query(`DROP TABLE "char"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "comic"`);
    }

}
