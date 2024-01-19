
import { Controller, Post, Body, UseInterceptors, UploadedFile, Get } from "@nestjs/common";
import { ApiTags, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SanmarService } from "./sanmar.service";
import { CommonResponseModel, SanmarOrderFilter } from "@project-management-system/shared-models";
import { SanmarDto } from "./dto/sanmar.dto";


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
    

}