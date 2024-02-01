
import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { diskStorage } from 'multer'
import { FileInterceptor } from "@nestjs/platform-express";
import { EddieService } from "./eddie.service";
import { CommonResponseModel, EddieOrderFilter } from "@project-management-system/shared-models";
import { CentricDto } from "../centric-buyer/dto/centric.dto";




@ApiTags("/eddiebauer")
@Controller("/eddiebauer")
export class EddieController {

    constructor(
        private readonly Service: EddieService,
        private readonly applicationExeptionhandler: ApplicationExceptionHandler

    ) { }

    @Post("/saveEddieOrder")
    @ApiBody({ type: CentricDto })
    async saveEddieOrder(@Body() req: any): Promise<CommonResponseModel> {
        console.log(req, "post")
        try {
            return await this.Service.saveEddieOrder(req);
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
            return await this.Service.updatePath(req.jsonData,req.poNumber, file.path, file.filename, file.mimetype)
        } catch (error) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, error);
        }
    }


    @Post('/getorderacceptanceData')
    @ApiBody({ type: EddieOrderFilter })
    async getorderacceptanceData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getorderacceptanceData(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }
 

}