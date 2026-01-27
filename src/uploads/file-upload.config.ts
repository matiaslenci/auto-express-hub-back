import { BadRequestException } from '@nestjs/common';
import { memoryStorage } from 'multer';

const ALLOWED_MIMETYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const multerConfig = {
    storage: memoryStorage(),
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
    fileFilter: (
        req: Express.Request,
        file: Express.Multer.File,
        callback: (error: Error | null, acceptFile: boolean) => void,
    ) => {
        if (!ALLOWED_MIMETYPES.includes(file.mimetype)) {
            return callback(
                new BadRequestException(
                    'Invalid file type. Only JPG, JPEG, PNG, and WebP are allowed.',
                ),
                false,
            );
        }
        callback(null, true);
    },
};
