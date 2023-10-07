import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { StyleOrderService } from "./style-order.service";

@ApiTags('styleOrder')
@Controller('styleOrder')
export class StyleOrderController{
    constructor(
        private readonly styleOrderService :StyleOrderService,
     private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}
}