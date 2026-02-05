import {
    Injectable,
    NotFoundException,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
    validateImageMagicBytes,
    MAX_OUTPUT_DIMENSION,
    WEBP_QUALITY,
} from './file-upload.config';

export type UploadFolder = 'vehicles' | 'agencies';

@Injectable()
export class UploadsService {
    private readonly uploadsPath: string;

    constructor(private readonly configService: ConfigService) {
        this.uploadsPath = path.join(process.cwd(), 'uploads');
        this.ensureDirectoriesExist();
    }

    private ensureDirectoriesExist(): void {
        const folders: UploadFolder[] = ['vehicles', 'agencies'];
        folders.forEach((folder) => {
            const folderPath = path.join(this.uploadsPath, folder);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }
        });
    }

    async saveImage(
        file: Express.Multer.File,
        folder: UploadFolder,
    ): Promise<{ url: string; filename: string }> {
        // Validar magic bytes del archivo para prevenir spoofing
        const validation = validateImageMagicBytes(file.buffer);
        if (!validation.isValid) {
            throw new BadRequestException(
                'El archivo no es una imagen válida. El contenido no coincide con un formato de imagen permitido (JPG, PNG, WebP).',
            );
        }

        const filename = `${uuidv4()}.webp`;
        const filePath = path.join(this.uploadsPath, folder, filename);

        try {
            // Procesar y optimizar imagen con Sharp
            await sharp(file.buffer)
                .resize(MAX_OUTPUT_DIMENSION, MAX_OUTPUT_DIMENSION, {
                    fit: 'inside',
                    withoutEnlargement: true,
                })
                .webp({ quality: WEBP_QUALITY })
                .toFile(filePath);
        } catch (error) {
            // Manejar errores específicos de Sharp
            if (error instanceof Error) {
                throw new InternalServerErrorException(
                    `Error al procesar la imagen: ${error.message}`,
                );
            }
            throw new InternalServerErrorException(
                'Error desconocido al procesar la imagen.',
            );
        }

        const baseUrl =
            this.configService.get<string>('BASE_URL') || 'http://localhost:3000';
        const url = `${baseUrl}/uploads/${folder}/${filename}`;

        return { url, filename };
    }

    async deleteImage(folder: UploadFolder, filename: string): Promise<void> {
        const filePath = path.join(this.uploadsPath, folder, filename);

        if (!fs.existsSync(filePath)) {
            throw new NotFoundException('Imagen no encontrada.');
        }

        try {
            fs.unlinkSync(filePath);
        } catch (error) {
            throw new InternalServerErrorException(
                'Error al eliminar la imagen.',
            );
        }
    }
}
