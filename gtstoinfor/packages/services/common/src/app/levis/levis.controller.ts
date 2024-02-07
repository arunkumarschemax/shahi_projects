
import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { diskStorage } from 'multer'
import { LevisService } from "./levis.service";




@ApiTags("/levis")
@Controller("/levis")
export class LevisController {

    constructor(
        private readonly Service: LevisService,
        private readonly applicationExeptionhandler: ApplicationExceptionHandler

    ) { }


 
}