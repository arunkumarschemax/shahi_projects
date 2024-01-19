
import { Controller, Post, Body, UseInterceptors, UploadedFile, Get } from "@nestjs/common";
import { ApiTags, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SanmarService } from "./sanmar.service";
import { CommonResponseModel } from "@project-management-system/shared-models";
import { SanmarDto } from "./dto/sanmar.dto";


@ApiTags("/sanmar")
@Controller("/sanmar-orders")
export class SanmarController {

    constructor(
        private readonly Service: SanmarService,
        private readonly applicationExeptionhandler: ApplicationExceptionHandler

    ) { }

    @Post("/saveHbOrdersData")
    @ApiBody({ type: SanmarDto })
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

    async fileUpload(@UploadedFile() file, @Body() req: any): Promise<CommonResponseModel> {

        try {
            return await this.Service.updatePath(req.jsonData, req.buyerPo, file.path, file.filename, file.mimetype)
        } catch (error) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, error);
        }
    }

    

}