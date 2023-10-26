import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RmSkusService } from "./rm-skus.controller";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";

@ApiTags('RMSkus')
@Controller('rm-skus')
export class RmSkusController {
    constructor(
        private rmSkuService: RmSkusService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

    ) { }
}