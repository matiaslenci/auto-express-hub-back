import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

// Cargar variables de entorno desde el archivo .env si existe
config({ path: join(process.cwd(), '.env') });

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_DATABASE || 'auto-express-hub',
    entities: [
        join(process.cwd(), 'src/**/*.entity{.ts,.js}'),
        join(process.cwd(), 'dist/**/*.entity{.ts,.js}'),
    ],
    migrations: [
        join(process.cwd(), 'src/database/migrations/*{.ts,.js}'),
        join(process.cwd(), 'dist/database/migrations/*{.ts,.js}'),
    ],
    synchronize: false,
});

