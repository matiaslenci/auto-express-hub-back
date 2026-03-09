import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1773080512701 implements MigrationInterface {
    name = 'Init1773080512701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_5dc3aa9f011ac4589336d4678f"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_5dc3aa9f011ac4589336d4678f" ON "vehicles" ("marca") `);
    }

}
