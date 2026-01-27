import {
    Controller,
    Post,
    Delete,
    Param,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    HttpCode,
    HttpStatus,
    ParseFilePipe,
    MaxFileSizeValidator,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiConsumes,
    ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UploadsService } from './uploads.service';
import { multerConfig } from './file-upload.config';

type UploadFolder = 'vehicles' | 'agencies';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) { }

    @Post('vehicle-image')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file', multerConfig))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Upload a vehicle image' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Image uploaded successfully',
        schema: {
            type: 'object',
            properties: {
                url: { type: 'string' },
                filename: { type: 'string' },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Invalid file type or size' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async uploadVehicleImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
            }),
        )
        file: Express.Multer.File,
    ) {
        return this.uploadsService.saveImage(file, 'vehicles');
    }

    @Post('agency-logo')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file', multerConfig))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Upload an agency logo' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Logo uploaded successfully',
        schema: {
            type: 'object',
            properties: {
                url: { type: 'string' },
                filename: { type: 'string' },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Invalid file type or size' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async uploadAgencyLogo(
        @UploadedFile(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
            }),
        )
        file: Express.Multer.File,
    ) {
        return this.uploadsService.saveImage(file, 'agencies');
    }

    @Post('agency-cover')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file', multerConfig))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Upload an agency cover image' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Cover image uploaded successfully',
        schema: {
            type: 'object',
            properties: {
                url: { type: 'string' },
                filename: { type: 'string' },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Invalid file type or size' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async uploadAgencyCover(
        @UploadedFile(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
            }),
        )
        file: Express.Multer.File,
    ) {
        return this.uploadsService.saveImage(file, 'agencies');
    }

    @Delete(':folder/:filename')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete an uploaded image' })
    @ApiResponse({ status: 200, description: 'Image deleted successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Image not found' })
    async deleteImage(
        @Param('folder') folder: string,
        @Param('filename') filename: string,
    ) {
        // Validate folder parameter
        if (folder !== 'vehicles' && folder !== 'agencies') {
            throw new BadRequestException(
                'Invalid folder. Must be "vehicles" or "agencies".',
            );
        }
        await this.uploadsService.deleteImage(folder as UploadFolder, filename);
        return { message: 'Image deleted successfully' };
    }
}
