import { MigrationInterface, QueryRunner } from 'typeorm';

export class FotosFilenamesOnly1741542986000 implements MigrationInterface {
    name = 'FotosFilenamesOnly1741542986000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Vehicles: extraer solo el filename de cada URL en el array fotos
        await queryRunner.query(`
            UPDATE vehicles
            SET fotos = (
                SELECT array_agg(
                    CASE
                        WHEN f LIKE '%/%' THEN substring(f FROM '[^/]+$')
                        ELSE f
                    END
                )
                FROM unnest(fotos) AS f
            )
            WHERE fotos IS NOT NULL AND array_length(fotos, 1) > 0
        `);

        // Agencies: extraer solo el filename del logo
        await queryRunner.query(`
            UPDATE agencies SET logo = substring(logo FROM '[^/]+$')
            WHERE logo IS NOT NULL AND logo LIKE '%/%'
        `);

        // Agencies: extraer solo el filename de la portada
        await queryRunner.query(`
            UPDATE agencies SET portada = substring(portada FROM '[^/]+$')
            WHERE portada IS NOT NULL AND portada LIKE '%/%'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // No es posible reconstruir las URLs originales de forma confiable.
        // Esta migración es efectivamente irreversible.
        console.warn(
            '[FotosFilenamesOnly] ADVERTENCIA: Los datos originales (URLs completas) no pueden restaurarse automáticamente.',
        );
    }
}
