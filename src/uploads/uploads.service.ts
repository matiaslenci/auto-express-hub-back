import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

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
        const filename = `${uuidv4()}.webp`;
        const filePath = path.join(this.uploadsPath, folder, filename);

        // Process and optimize image with Sharp
        await sharp(file.buffer)
            .resize(1920, 1920, {
                fit: 'inside',
                withoutEnlargement: true,
            })
            .webp({ quality: 80 })
            .toFile(filePath);

        const baseUrl =
            this.configService.get<string>('BASE_URL') || 'http://localhost:3000';
        const url = `${baseUrl}/uploads/${folder}/${filename}`;

        return { url, filename };
    }

    async deleteImage(folder: UploadFolder, filename: string): Promise<void> {
        const filePath = path.join(this.uploadsPath, folder, filename);

        if (!fs.existsSync(filePath)) {
            throw new NotFoundException('Image not found');
        }

        fs.unlinkSync(filePath);
    }
}
