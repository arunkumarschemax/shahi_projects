
import { Controller, Post, Body, UseInterceptors, UploadedFile, Get } from "@nestjs/common";
import { ApiTags, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SanmarService } from "./sanmar.service";
import { CommonResponseModel, SanmarOrderFilter } from "@project-management-system/shared-models";
import { SanmarDto } from "./dto/sanmar.dto";
import { diskStorage } from 'multer'
import { FileInterceptor } from "@nestjs/platform-express";




@ApiTags("/sanmar")
@Controller("/sanmar-orders")
export class SanmarController {

    constructor(
        private readonly Service: SanmarService,
        private readonly applicationExeptionhandler: ApplicationExceptionHandler

    ) { }

    @Post("/saveSanmarOrdersData")
    @ApiBody({ type: SanmarDto })
    async saveSanmarOrdersData(@Body() req: any): Promise<CommonResponseModel> {
        console.log(req, "post")
        try {
            return await this.Service.saveSanmarOrdersData(req);
        } catch (error) {
            return this.applicationExeptionhandler.returnException(
                CommonResponseModel,
                error
            );
        }
    }

    @Post('/fileUpload')
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
        fileFilter: async (req, file, callback) => {
            try {
                if (!file || file.mimetype !== 'application/pdf') {
                    return callback(new Error('Only PDF files are allowed!'), false);
                }
                callback(null, true);
            } catch (error) {
                callback(error, false);
            }
        },
    }))

    async fileUpload(@UploadedFile() file, @Body() req: any): Promise<CommonResponseModel> {

        try {
            return await this.Service.updatePath(req.jsonData, req.buyerPo, file.path, file.filename, file.mimetype)
        } catch (error) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, error);
        }
    }
  

    @Post('/getPdfFileInfo')
    async getPdfFileInfo(): Promise<CommonResponseModel> {
        try {
            return this.Service.getPdfFileInfo();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getorderDataForInfo')
    @ApiBody({ type: SanmarOrderFilter })
    async getorderDataForInfo(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getorderDataForInfo(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getCustomerPoNumber')
    async getCustomerPoNumber(): Promise<CommonResponseModel> {
        try {
            return this.Service.getCustomerPoNumber();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/sanmarBot')
    async sanmarBot(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.Service.sanmarBot();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }
    

    @Post('/getorderacceptanceData')
    @ApiBody({ type: SanmarOrderFilter })
    async getorderacceptanceData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getorderacceptanceData(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/sanmarCoLineCreationReq')
    async sanmarCoLineCreationReq(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.sanmarCoLineCreationReq(req)
        } catch (error) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
        }
    }
}