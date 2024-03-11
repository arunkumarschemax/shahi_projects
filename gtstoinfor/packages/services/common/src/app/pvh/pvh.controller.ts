
import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { diskStorage } from 'multer'
import * as fs from 'fs';
import { PVHService } from "./pvh.service";


@ApiTags("/pvh")
@Controller("/pvh")
export class PVHController {

    constructor(
        private readonly Service: PVHService,
        private readonly applicationExeptionhandler: ApplicationExceptionHandler

    ) { }


}