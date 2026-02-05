import { BadRequestException } from '@nestjs/common';
import { memoryStorage } from 'multer';

// Tipos MIME permitidos
export const ALLOWED_MIMETYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

// Tamaño máximo: 10MB
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Dimensiones máximas de salida
export const MAX_OUTPUT_DIMENSION = 1920;

// Calidad de compresión WebP (0-100)
export const WEBP_QUALITY = 80;

/**
 * Magic bytes para validar el tipo real de archivo
 * - JPEG: FF D8 FF
 * - PNG: 89 50 4E 47 0D 0A 1A 0A
 * - WebP: RIFF....WEBP (bytes 0-3: RIFF, bytes 8-11: WEBP)
 */
export function validateImageMagicBytes(buffer: Buffer): {
    isValid: boolean;
    detectedType: string | null;
} {
    if (buffer.length < 12) {
        return { isValid: false, detectedType: null };
    }

    // Check JPEG: FF D8 FF
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
        return { isValid: true, detectedType: 'image/jpeg' };
    }

    // Check PNG: 89 50 4E 47 0D 0A 1A 0A
    if (
        buffer[0] === 0x89 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x4e &&
        buffer[3] === 0x47 &&
        buffer[4] === 0x0d &&
        buffer[5] === 0x0a &&
        buffer[6] === 0x1a &&
        buffer[7] === 0x0a
    ) {
        return { isValid: true, detectedType: 'image/png' };
    }

    // Check WebP: RIFF....WEBP
    if (
        buffer[0] === 0x52 && // R
        buffer[1] === 0x49 && // I
        buffer[2] === 0x46 && // F
        buffer[3] === 0x46 && // F
        buffer[8] === 0x57 && // W
        buffer[9] === 0x45 && // E
        buffer[10] === 0x42 && // B
        buffer[11] === 0x50 // P
    ) {
        return { isValid: true, detectedType: 'image/webp' };
    }

    return { isValid: false, detectedType: null };
}

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
                    'Tipo de archivo no válido. Solo se permiten JPG, JPEG, PNG y WebP.',
                ),
                false,
            );
        }
        callback(null, true);
    },
};
