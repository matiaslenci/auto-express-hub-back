import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexMarca1772930961549 implements MigrationInterface {
    name = 'AddIndexMarca1772930961549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_5dc3aa9f011ac4589336d4678f" ON "vehicles" ("marca") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_5dc3aa9f011ac4589336d4678f"`);
    }

}
