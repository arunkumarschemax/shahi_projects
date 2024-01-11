
import { Controller, Post, Body, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { HbDto } from "./dto/hb.dto";
import { CommonResponseModel, HbPoOrderFilter } from "@project-management-system/shared-models";
import { HbService } from "./hb-athletic.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { diskStorage } from 'multer'


@ApiTags("/hb-athletics")
@Controller("/hb-athletics-orders")
export class HbController {

    constructor(
        private readonly Service: HbService,
        private readonly applicationExeptionhandler: ApplicationExceptionHandler

    ) { }
    @Post("/saveHbOrdersData")
    @ApiBody({ type:HbDto })
    async saveHbOrdersData(@Body() req: any): Promise<CommonResponseModel> {
        console.log(req, "post")
        try {
            return await this.Service.saveHbOrdersData(req);
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
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(pdf)$/)) {
                return callback(new Error('Only pdf files are allowed!'), false);
            }
            callback(null, true);
        },
    }))

    async fileUpload(@UploadedFile() file, @Body() req:any): Promise<CommonResponseModel> {

        try {
            return await this.Service.updatePath(req.jsonData,req.custPo, file.path, file.filename, file.mimetype)
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

    @Post('/getHborderData')
    @ApiBody({ type: HbPoOrderFilter })
    async getHborderData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getHborderData(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getHbPoNumber')
    async getHbPoNumber(): Promise<CommonResponseModel> {
        try {
            return this.Service.getHbPoNumber();
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/hbCoLineCreationReq')
    async hbCoLineCreationReq(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.Service.hbCoLineCreationReq(req)
        } catch (error) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, error)
        }
    }

}