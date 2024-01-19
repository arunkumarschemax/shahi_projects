
import { Controller, Post, Body, UseInterceptors, UploadedFile, Get } from "@nestjs/common";
import { ApiTags, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SanmarService } from "./sanmar.service";


@ApiTags("/sanmar")
@Controller("/sanmar-orders")
export class SanmarController {

    constructor(
        private readonly Service: SanmarService,
        private readonly applicationExeptionhandler: ApplicationExceptionHandler

    ) { }
    

}