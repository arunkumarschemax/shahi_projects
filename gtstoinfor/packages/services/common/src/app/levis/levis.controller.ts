
import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { diskStorage } from 'multer'
import { LevisService } from "./levis.service";
import { CommonResponseModel, LevisOrderFilter } from "@project-management-system/shared-models";




@ApiTags("/levis")
@Controller("/levis")
export class LevisController {

    constructor(
        private readonly Service: LevisService,
        private readonly applicationExeptionhandler: ApplicationExceptionHandler

    ) { }


    @Post('/getorderacceptanceData')
    @ApiBody({ type: LevisOrderFilter })
    async getorderacceptanceData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.Service.getorderacceptanceData(req);
        } catch (err) {
            return this.applicationExeptionhandler.returnException(CommonResponseModel, err);
        }
    }
 
}