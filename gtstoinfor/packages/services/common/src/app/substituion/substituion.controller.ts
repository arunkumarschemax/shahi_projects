import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SubstituionService } from "./substituion.service";

@ApiTags('substituion')
@Controller('substituion')
export class SubstituionController{
    constructor(
        private readonly substituionService :SubstituionService,
     private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}
}