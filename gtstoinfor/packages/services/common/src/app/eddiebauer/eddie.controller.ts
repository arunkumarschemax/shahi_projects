
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { diskStorage } from 'multer'
import { FileInterceptor } from "@nestjs/platform-express";
import { EddieService } from "./eddie.service";




@ApiTags("/eddiebauer")
@Controller("/eddiebauer")
export class EddieController {

    constructor(
        private readonly Service: EddieService,
        private readonly applicationExeptionhandler: ApplicationExceptionHandler

    ) { }

 

}