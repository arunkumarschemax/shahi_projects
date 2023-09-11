import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AdobeAcrobatApiService, CreateCompletionDto } from './adobe-acrobat-api.service';
import { Body, Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'; // Import Express type

@Controller('adobe-acrobat-api')
export class AdobeAcrobatApiController {
    constructor(
        private adobeAcrobatApiService: AdobeAcrobatApiService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ) { }

    @Post('/createCompletion')
    async createCompletion(@Body() createCompletionDto: any) {
        return this.adobeAcrobatApiService.createCompletion(createCompletionDto);
    }


    @Post('/extractTextFromPdf')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        limits: { files: 1 },
        storage: diskStorage({
            destination: './upload-files',
            filename: (req, file, callback) => {
                console.log(file.originalname);
                const name = file.originalname;
                callback(null, `${name}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(pdf)$/)) {
                return callback(new Error('Only pdf files are allowed!'), false);
            }
            callback(null, true);
        },
    }))
    async extractTextFromPdf(@UploadedFile() file: any): Promise<any> {
        try {
            return this.adobeAcrobatApiService.extractTextFromPdf(file);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }


}
