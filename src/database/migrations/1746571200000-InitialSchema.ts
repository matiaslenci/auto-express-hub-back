import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1746571200000 implements MigrationInterface {
    name = 'InitialSchema1746571200000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crear tipos ENUM
        await queryRunner.query(
            `CREATE TYPE "public"."agencies_plan_enum" AS ENUM('gratuito', 'basico', 'profesional', 'premium')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."vehicles_tipovehiculo_enum" AS ENUM('AUTO', 'MOTO')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."vehicles_moneda_enum" AS ENUM('ARS', 'USD', 'CONSULTAR')`,
        );

        // Crear tabla agencies
        await queryRunner.query(`
            CREATE TABLE "agencies" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "nombre" character varying NOT NULL,
                "logo" character varying,
                "portada" character varying,
                "ubicacion" character varying,
                "whatsapp" character varying,
                "plan" "public"."agencies_plan_enum" NOT NULL DEFAULT 'gratuito',
                "limitePublicaciones" integer NOT NULL DEFAULT 10,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "isAdmin" boolean NOT NULL DEFAULT false,
                "isActive" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_agencies_id" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_agencies_username" UNIQUE ("username"),
                CONSTRAINT "UQ_agencies_email" UNIQUE ("email")
            )
        `);

        // Crear índices únicos para agencies
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_agencies_username" ON "agencies" ("username")`,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_agencies_email" ON "agencies" ("email")`,
        );

        // Habilitar extensión uuid-ossp si no existe
        await queryRunner.query(
            `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,
        );

        // Actualizar default de id para usar uuid_generate_v4
        await queryRunner.query(
            `ALTER TABLE "agencies" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
        );

        // Crear tabla vehicles
        await queryRunner.query(`
            CREATE TABLE "vehicles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "marca" character varying NOT NULL,
                "tipoVehiculo" "public"."vehicles_tipovehiculo_enum" NOT NULL DEFAULT 'AUTO',
                "modelo" character varying NOT NULL,
                "anio" integer NOT NULL,
                "precio" numeric(10,2),
                "moneda" "public"."vehicles_moneda_enum" NOT NULL DEFAULT 'ARS',
                "tipo" character varying NOT NULL,
                "transmision" character varying NOT NULL,
                "combustible" character varying NOT NULL,
                "kilometraje" integer NOT NULL,
                "color" character varying NOT NULL,
                "descripcion" text,
                "localidad" character varying,
                "fotos" text[] NOT NULL,
                "activo" boolean NOT NULL DEFAULT true,
                "vistas" integer NOT NULL DEFAULT 0,
                "clicksWhatsapp" integer NOT NULL DEFAULT 0,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "agencyId" uuid NOT NULL,
                CONSTRAINT "PK_vehicles_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_vehicles_agencyId" FOREIGN KEY ("agencyId")
                    REFERENCES "agencies"("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);

        // Crear tabla vehicle_analytics
        await queryRunner.query(`
            CREATE TABLE "vehicle_analytics" (
                "vehicleId" uuid NOT NULL,
                "date" date NOT NULL,
                "viewsCount" integer NOT NULL DEFAULT 0,
                "clicksCount" integer NOT NULL DEFAULT 0,
                CONSTRAINT "PK_vehicle_analytics" PRIMARY KEY ("vehicleId", "date"),
                CONSTRAINT "FK_vehicle_analytics_vehicleId" FOREIGN KEY ("vehicleId")
                    REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);

        // Crear índice único compuesto para vehicle_analytics
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_vehicle_analytics_vehicleId_date" ON "vehicle_analytics" ("vehicleId", "date")`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar tablas en orden inverso (respetando foreign keys)
        await queryRunner.query(`DROP TABLE IF EXISTS "vehicle_analytics"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "vehicles"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "agencies"`);

        // Eliminar tipos ENUM
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."vehicles_moneda_enum"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."vehicles_tipovehiculo_enum"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."agencies_plan_enum"`);
    }
}
